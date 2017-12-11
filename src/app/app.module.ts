import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LogComponent } from './components/log/log.component';
import { LogItemComponent } from './components/log/log-item/log-item.component';
import {LogService} from "./services/log.service";
import {HttpClientModule} from "@angular/common/http";
import {LoadingModule} from "ngx-loading";
import {NgxPaginationModule} from "ngx-pagination";
import { HeaderComponent } from './components/header/header.component';
import { FilterFormComponent } from './components/log/filter-form/filter-form.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { CalendarDirective } from './directives/calendar.directive';
import { CalendarComponent } from './components/calendar/calendar.component';
import {ChartsModule} from "ng2-charts";
import { BarGraphComponent } from './components/bar-graph/bar-graph.component';
@NgModule({
  declarations: [
    AppComponent,
    LogComponent,
    LogItemComponent,
    HeaderComponent,
    FilterFormComponent,
    DropdownDirective,
    CalendarDirective,
    CalendarComponent,
    BarGraphComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LoadingModule,
    NgxPaginationModule,
    ChartsModule


  ],
  providers: [LogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
