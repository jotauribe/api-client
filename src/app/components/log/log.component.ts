import {AfterViewChecked, AfterViewInit, Component, HostBinding, Input, OnInit} from '@angular/core';
import {LogItem} from "./log-item/log-item.model";
import {LogService} from "../../services/log.service";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {PaginationInstance} from "ngx-pagination";

declare var $;

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit, AfterViewInit {

  @HostBinding('attr.class') cssClass = 'ui container';
  logItems: LogItem[];
  numberOfPages: number;
  loading: boolean = false;
  searchParams: string[] = [];

  public config: PaginationInstance = {
    id: 'log',
    itemsPerPage: 20,
    currentPage: 1
  };

  constructor(private logService: LogService) {
    const date = new Date()
    const actualDateString = (date.getMonth()-1)+"/"+5+"/"+date.getFullYear();
    this.searchParams['start_date'] = actualDateString;
    this.searchParams['end_date'] = actualDateString;
    this.searchParams['state_code'] = "FL";
  }

  ngOnInit() {
    this.search(this.searchParams['start_date'], this.searchParams['end_date'], this.searchParams['state_code'])
  }

  ngAfterViewInit(): void {

  }

  search(startDate: string, endDate: string, stateCode: string): void {
    this.searchParams['start_date'] = startDate;
    this.searchParams['end_date'] = endDate;
    this.searchParams['state_code'] = stateCode;
    this.loading= true;
    this.logService.getLogs(startDate, endDate, stateCode)
      .subscribe(results => {
        this.loading = false;
        console.log(results.length)
        this.numberOfPages = results.length;
        this.logItems = results;
      })
  }

  pageChanged(page: number){
    $('.tabular.menu .item').tab();
  }

  filterByState(state: string){
    console.log("State Code: " + state);
    this.search(this.searchParams['start_date'], this.searchParams['end_date'], state);
  }

}
