import {AfterViewChecked, AfterViewInit, Component, HostBinding, OnInit} from '@angular/core';
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

  public config: PaginationInstance = {
    id: 'log',
    itemsPerPage: 20,
    currentPage: 1
  };

  constructor(private logService: LogService) {

  }

  ngOnInit() {  }

  ngAfterViewInit(): void {
    let date = new Date();
    let actualDateString = date.getMonth()+"/"+date.getDay()+"/"+date.getFullYear();
    this.search(actualDateString, actualDateString, "OH")

  }

  search(startDate: string, endDate: string, stateCode: string): void {
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

}
