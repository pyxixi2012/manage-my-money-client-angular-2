import {Injectable}     from 'angular2/core';
import * as moment from 'moment/moment';

@Injectable()
export class DatesService {
    startDate: any = null;
    endDate: any = null;
    getDatesFromPeriod (period: string) { //returns: {"cat_id":8,"cat_name":"Financial","amount":-388.28}
        switch (period) {
            case 'This month':
                this.startDate = moment().utc().startOf('month');
                this.endDate = moment().utc().endOf('month');
                break;

            case 'Last month':
                this.startDate = moment().utc().subtract(1, 'month').startOf('month');
                this.endDate = moment().utc().subtract(1, 'month').endOf('month');
                break;

            case 'Last 3 months':
                this.startDate = moment().utc().subtract(3, 'month').startOf('month');
                this.endDate = moment().utc().subtract(1, 'month').endOf('month');
                break;

            case 'Last 6 months':
                this.startDate = moment().utc().subtract(6, 'month').startOf('month');
                this.endDate = moment().utc().subtract(1, 'month').endOf('month');
                break;

            case 'Last 12 months':
                this.startDate = moment().utc().subtract(12, 'month').startOf('month');
                this.endDate = moment().utc().subtract(1, 'month').endOf('month');
                break;

            case 'This year':
                this.startDate = moment().utc().startOf('year');
                this.endDate = moment().utc().endOf('year');
                break;

            case 'Last year':
                this.startDate = moment().utc().subtract(1, 'year').startOf('year');
                this.endDate = moment().utc().subtract(1, 'year').endOf('year');
                break;
            case 'All time':
                this.startDate = moment().utc().subtract(1, 'year').startOf('year');
                this.endDate = moment().utc();
                break;
        }
        return {
            startDate: this.startDate,
            endDate: this.endDate
        };
    }
}
