import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {AccountsService} from '../../shared/services/accounts.service';
import {TransactionsService} from '../../shared/services/transactions.service';
import {DatesService} from '../../shared/services/dates.service';

@Component({
    selector: 'sd-accounts',
    moduleId: module.id,
    viewProviders: [AccountsService, TransactionsService, DatesService],
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.css'],
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES]
})

export class AccountsComponent {
    errorMessage : any = null;
    accounts : any = [];
    transactions : any = [];
    constructor (private _accountsService: AccountsService, private _transactionsService: TransactionsService) {}
    ngOnInit() {
        this.getAccounts();
    }
    showAdvanced(ev: any) {
    console.log('Hello');
    };
    getAccounts() {
        this._accountsService.getAccounts()
            .subscribe(
                 accounts => this.accounts = accounts,
                 error =>  this.errorMessage = <any>error
             );
    }
    getTransactions(accountId: string) {
        this._transactionsService.getTransactions(accountId)
            .subscribe(
                 transactions => this.transactions = transactions,
                 error =>  this.errorMessage = <any>error
             );
    }
}
