import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PaginationInstance} from "ngx-pagination";
import {LogItem} from "../log/log-item/log-item.model";

@Component({
  selector: 'app-pagination-controller',
  templateUrl: './pagination-controller.component.html',
  styleUrls: ['./pagination-controller.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationControllerComponent implements OnInit {

  public config: PaginationInstance = {
    id: 'log',
    itemsPerPage: 20,
    currentPage: 1
  };

  constructor() { }

  ngOnInit() {
  }

}
