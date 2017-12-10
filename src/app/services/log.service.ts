import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {ListResult} from "./api/list-result.interface";
import {LogItem} from "../components/log/log-item/log-item.model";

@Injectable()
export class LogService {

  url = "https://api.cebroker.com/v1/cerenewaltransactions/GetLogsRecordData";//?startdate=12/09/2017&enddate=12/09/2017&state=FL";

  constructor(private httpClient: HttpClient) { }

  getLogs(startDate: string = null, endDate: string = null, stateCode: string = null): Observable<LogItem[]>{
    var p = new HttpParams();
    if (startDate) p = p.append('startdate', startDate)
    if (endDate) p =  p.append('enddate', endDate)
    if (stateCode) p = p.append('state', stateCode)
    console.log("Lo que estamos buscando: "+p.toString());
    return this.httpClient.get<LogItem[]>(this.url, {params: p})
  }

}
