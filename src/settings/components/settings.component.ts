import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {AccountsService} from '../../shared/services/accounts.service';
import {CategoriesService} from '../../shared/services/categories.service';
import {DatesService} from '../../shared/services/dates.service';

@Component({
    selector: 'sd-settings',
    moduleId: module.id,
    viewProviders: [AccountsService, CategoriesService, DatesService],
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css'],
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES]
})

export class SettingsComponent {
    errorMessage : any = null;
    accounts : any = [];
    categories : any = [];
    constructor (private _accountsService: AccountsService, private _categoriesService: CategoriesService) {}
    ngOnInit() {
        this.getCategories();
    }
    getAccounts() {
        this._accountsService.getAccounts()
            .subscribe(
                 accounts => this.accounts = accounts,
                 error =>  this.errorMessage = <any>error
             );
    }
    getCategories() {
        this._categoriesService.getCategories()
            .subscribe(
                 categories => this.categories = categories,
                 error =>  this.errorMessage = <any>error
             );
    }
}
