import {Component} from 'angular2/core';
import {HTTP_PROVIDERS}    from 'angular2/http';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from 'ng2-material/all';
import {NavbarComponent} from './navbar.component';
import {HomeComponent} from '../../home/components/home.component';
import {AccountsComponent} from '../../accounts/components/accounts.component';
import {SettingsComponent} from '../../settings/components/settings.component';

@Component({
  selector: 'sd-app',
  viewProviders: [HTTP_PROVIDERS, MATERIAL_PROVIDERS],
  moduleId: module.id,
  templateUrl: './app.component.html',
  directives: [ROUTER_DIRECTIVES, NavbarComponent, MATERIAL_DIRECTIVES]
})
@RouteConfig([
  { path: '/',      name: 'Dashboard',  component: HomeComponent  },
  { path: '/accounts', name: 'Accounts', component: AccountsComponent },
  { path: '/settings', name: 'Settings', component: SettingsComponent }
])
export class AppComponent {}
