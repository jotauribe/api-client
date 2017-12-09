import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {LogItem} from "./log-item.model";

@Component({
  selector: 'app-log-item',
  templateUrl: './log-item.component.html',
  styleUrls: ['./log-item.component.css']
})
export class LogItemComponent implements OnInit {

  @HostBinding('attr.class') cssClass = 'ui red card';
  @Input() logItem: LogItem;

  constructor() {
    this.logItem = new LogItem(
      "FL",
      "1701",
      "RN",
      99999,
      "2020-04-30T00:00:00",
      "PRIMARY",
      "2017-08-03T19:26:13.89923",
      "IN_PROG",
      "2017-08-03T19:26:14.347996",
      "JAX00",
      1
      )
  }

  ngOnInit() {
  }

}
