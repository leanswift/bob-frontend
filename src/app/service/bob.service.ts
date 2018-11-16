import { Injectable } from '@angular/core';
import { Http, ResponseContentType, Headers } from '@angular/http';
import { ProgressHttp } from 'angular-progress-http';
import { Observable } from 'rxjs/Observable';
import { BuildConfiguration } from '../create-config/build-configuration.interface';

const baseUrl = 'http://localhost:8888';

@Injectable()
export class BobService {

    customizables = [];
    progress = 0;

    constructor(private http: Http, private progressHttp: ProgressHttp) {}

    public getVersions(project: string): Observable<any> {
        return this.http.get(baseUrl + '/' + project + '/versions');
    }

    public getCustomizables(project: string, version: string): Observable<any> {
        return this.http.get(baseUrl + '/' + project + '/' + version + '/customizables');
    }

    public downloadProject(project: string, version: string, progressCallback: ProgressCallback): Observable<any> {
        let data = {};
        data['configurations'] = this.customizables;
        return this.progressHttp
            .withDownloadProgressListener(progress => {
                console.log(progress);
                progressCallback.setProgress(progress.percentage);
            })
            .post(
                baseUrl + '/' + project + '/' + version + '/download',
                data,
                {
                    responseType: ResponseContentType.ArrayBuffer
                }
            );
    }

    public createConfiguration(project: string, configuration: BuildConfiguration): Observable<any> {
        this.verifyConfiguration(configuration);
        return this.http.post(baseUrl + '/' + project + '/versions', configuration, {
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
    }

    private verifyConfiguration(configuration) {
        const modules = configuration.modules;
        modules.forEach(module => {
            if(this.isNullOrEmpty(module.branch) && this.isNullOrEmpty(module.tag)) {
                throw Error('Both branch and tag cannot be empty');
            } else if(!this.isNullOrEmpty(module.branch) && !this.isNullOrEmpty(module.tag)) {
                throw Error('Only one of either branch or tag should be configured at once');
            } else {
                if(this.isNullOrEmpty(module.branch)) {
                    delete module.branch;
                }
                if(this.isNullOrEmpty(module.tag)) {
                    delete module.tag;
                }
            }
        });
    }

    private isNullOrEmpty(something): boolean {
        return typeof(something) === 'undefined' || something === null || something === '';
    }

}

export interface ProgressCallback {
    mode: string;
    progress: number;

    setProgress(progress: number): void;
}
