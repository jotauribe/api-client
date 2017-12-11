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

  filterByStartDate(startDate: Date){
    console.log("Start date: " + startDate);
    this.search(this.dateToString(startDate), this.searchParams['end_date'], this.searchParams['state_code']);
  }

  filterByEndDate(endDate: Date){
    console.log("End date: " + endDate);
    this.search(this.searchParams['start_date'], this.dateToString(endDate), this.searchParams['state_code']);
  }

  orderByCriteria(criteria: string): void {
    console.log("Criteria: " + criteria);
    if(this.logItems.length > 0){
      if(typeof this.logItems[0][criteria] === 'string')
        this.logItems.sort(function(a,b) {return (a[criteria] > b[criteria]) ? 1 : ((b[criteria] > a[criteria]) ? -1 : 0);} );
      if(typeof this.logItems[0][criteria] === 'number')
        this.logItems.sort(function(a, b){return a[criteria]-b[criteria]});
    }

  }

  dateToString(date: Date): string{
    const dateString = (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
    return dateString;
  }

}
