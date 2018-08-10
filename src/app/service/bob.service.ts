import { Injectable, Inject } from '@angular/core';
import { Http, RequestOptionsArgs, ResponseContentType, Headers } from '@angular/http';
import { ProgressHttp } from 'angular-progress-http';
import { Observable } from 'rxjs/Observable';
import { BuildConfiguration } from '../create-config/build-configuration.interface';
import { HttpHeaders } from '@angular/common/http';

const baseUrl = 'http://localhost:8888';

@Injectable()
export class BobService {

    customizables = [];
    progress = 0;

    constructor(private http: Http, private progressHttp: ProgressHttp) {}

    public getELinkVersions(): Observable<any> {
        return this.http.get(baseUrl + '/versions');
    }

    public getCustomizables(eLinkVersion: string): Observable<any> {
        return this.http.get(baseUrl + '/' + eLinkVersion + '/customizables');
    }

    public downloadELink(eLinkVersion: string, progressCallback: ProgressCallback): Observable<any> {
        let data = {};
        data['configurations'] = this.customizables;
        return this.progressHttp
            .withDownloadProgressListener(progress => {
                console.log(progress);
                progressCallback.setProgress(progress.percentage);
            })
            .post(
                baseUrl + '/' + eLinkVersion + '/download',
                data,
                {
                    responseType: ResponseContentType.ArrayBuffer
                }
            );
    }

    public createConfiguration(configuration: BuildConfiguration): Observable<any> {
        return this.http.post(baseUrl + '/versions', configuration, {
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
    }

}

export interface ProgressCallback {
    mode: string;
    progress: number;

    setProgress(progress: number): void;
}
