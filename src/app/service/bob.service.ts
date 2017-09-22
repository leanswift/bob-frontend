import { Injectable, Inject } from '@angular/core';
import { Http, RequestOptionsArgs, ResponseContentType } from '@angular/http';
import { ProgressHttp } from 'angular-progress-http';
import { Observable } from 'rxjs/Observable';

const baseUrl = 'http://172.30.1.109:8888';

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

}

export interface ProgressCallback {
    setProgress(progress: number): void;
}