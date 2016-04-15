import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {TransactionsService} from '../../shared/services/transactions.service';
import {DatesService} from '../../shared/services/dates.service';
import {BarChartComponent} from '../../barChart/components/barChart.component';

@Component({
  selector: 'sd-home',
  viewProviders: [TransactionsService, DatesService],
  moduleId: module.id,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, BarChartComponent]
})
export class HomeComponent {
  errorMessage: string = null;
  startDate: string = null;
  endDate: string = null;
  period: string = 'This month';
  chartData: string = '';
  model = {};
  transactions: any = [];
  periods = [
            {name: 'This month'},
            {name: 'Last month'},
            {name: 'Last 3 months'},
            {name: 'Last 6 months'},
            {name: 'Last 12 months'},
            {name: 'This year'},
            {name: 'Last year'},
            {name: 'All time'}
        ];
    constructor (private _transactionsService: TransactionsService, private _datesService: DatesService) {}
    ngOnInit() {
        this.getTransactionsByCategories(this.period);
    }
    getTransactionsByCategories(period: string) {
        this.period = period;
        let dates: any = null;
        dates = this._datesService.getDatesFromPeriod(this.period);
        this.startDate = dates.startDate.format('M/D/YYYY');
        this.endDate = dates.endDate.format('M/D/YYYY');
        this._transactionsService.getTransactionsByCategories(this.period)
             .subscribe(
                 transactions => this.transactions = transactions,
                 error =>  this.errorMessage = <any>error
             );
    }
}
