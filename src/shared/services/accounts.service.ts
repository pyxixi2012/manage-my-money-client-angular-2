import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AccountsService {
    constructor (private http: Http) {}
    private _serviceURL = 'http://localhost:8080/accounts';  // URL to web api 
    getAccounts () { //returns: [{"id":1,"name":"Cash"},{"id":2,"name":"BofA Checking"},{"id":3,"name":"E*Trade Savings"}]
        return this.http.get(this._serviceURL)
                        .map(res => <any> res.json())
                        .catch(this.handleError);
    }
    private handleError (error: Response) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
