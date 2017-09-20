import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';

@Injectable()
export class RestService {

    private ttUrl = "https://mybfh.bfh.ch/webservice/?action=get_tt_entries";

    constructor(private http: Http) {}

    getTimeTable() {
        return this.http.get(this.ttUrl).toPromise();
    }
}
