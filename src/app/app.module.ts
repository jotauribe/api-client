import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LogComponent } from './components/log/log.component';
import { LogItemComponent } from './components/log/log-item/log-item.component';
import {LogService} from "./services/log.service";
import {HttpClientModule} from "@angular/common/http";
import {Ng4LoadingSpinnerModule} from "ng4-loading-spinner";
import {LoadingModule} from "ngx-loading";

@NgModule({
  declarations: [
    AppComponent,
    LogComponent,
    LogItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LoadingModule
  ],
  providers: [LogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
