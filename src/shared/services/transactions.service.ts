import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {DatesService} from '../../shared/services/dates.service';

@Injectable()
export class TransactionsService {
    dates: any = null;
    constructor (private http: Http, private _datesService: DatesService) {}
    private _serviceURL = 'http://localhost:8080/transactions?';  // URL to web api 
    getTransactions (accountId: string) {
    /* 
        returns: [
            {
                "id": 1,
                "txn_date": "2013-01-01T00:00:00.000Z",
                "payee": "Opening Balance",
                "memo": null,
                "amount": 100,
                "account": {
                    "id": 1,
                    "name": "Cash"
                },
                "category": {
                    "id": 16,
                    "name": "Opening Balance"
                }
            }
        ]
    */
        let accountStr = 'account=' + accountId;
        return this.http.get(this._serviceURL + accountStr)
                        .map(res => <any> res.json())
                        .catch(this.handleError);
    }
    getTransactionsByCategories (period: string) { //returns: {"cat_id":8,"cat_name":"Financial","amount":-388.28}
        this.dates = this._datesService.getDatesFromPeriod(period);
        let dateRange: string = '';
        if (this.dates.startDate) {
            let startDateStr: string = this.dates.startDate.format('YYYY-MM-DD').toString();
            let endDateStr: string = this.dates.endDate.format('YYYY-MM-DD').toString();
            dateRange = 'groupByCategory&startDate=' + startDateStr + '&endDate=' + endDateStr;
        }
        return this.http.get(this._serviceURL + dateRange)
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
