import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TreeviewModule } from 'ngx-treeview';
import { ChartsModule } from 'ng2-charts';
//import { LOCALE_ID } from '@angular/core';
//import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
//import { registerLocaleData } from '@angular/common';
//import localeHr from '@angular/common/locales/hr';
//import localeHrExtra from '@angular/common/locales/extra/hr';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { httpLoaderFactory } from './services/translate/translate.service';


import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { TreeComponent } from './treeview/tree.component';
import { MegaMenuComponent } from './nav-menu/mega-menu/mega-menu.component';
import { BarChartComponent } from './charts/chart.component';
import { Globals } from './globals/globals';

import { UserService } from './services/user/user.service';
import { CommService } from "./services/communication/communication.service";

//registerLocaleData(localeHr, 'hr');
//registerLocaleData(localeHr, 'hr', localeHrExtra);

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    TreeComponent,
    MegaMenuComponent,
    BarChartComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ]),
    TreeviewModule.forRoot(),
    ChartsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [UserService, Globals, CommService],
  bootstrap: [AppComponent]
})
export class AppModule { }
