import { Injectable, Inject } from '@angular/core';
import { Http, RequestOptionsArgs, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';

const baseUrl = 'http://localhost:9090/http://172.30.1.109:8888';

@Injectable()
export class BobService {

    customizables = [];

    constructor(private http: Http) {}

    public getELinkVersions(): Observable<any> {
        return this.http.get(baseUrl + '/versions');
    }

    public getCustomizables(eLinkVersion: string): Observable<any> {
        return this.http.get(baseUrl + '/' + eLinkVersion + '/customizables');
    }

    public downloadELink(eLinkVersion: string): Observable<any> {
        let data = {};
        data['configurations'] = this.customizables; 
        return this.http.post(
            baseUrl + '/' + eLinkVersion + '/download',
            data,
            {
                responseType: ResponseContentType.ArrayBuffer
            }
        );
    }

}