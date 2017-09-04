import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Injectable()
export class RestService {

    constructor(private http: Http) {}

    public getELinkVersions(): Promise<any> {
        return this.http
            .get('http://localhost:8888/versions')
            .map((res: Response) => res.json())
            .toPromise();
    }

}