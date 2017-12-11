import {AfterViewInit, Component, ElementRef, EventEmitter, HostBinding, OnInit, Output} from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.css']
})
export class FilterFormComponent implements OnInit, AfterViewInit{

  @HostBinding('attr.class') cssClass = 'ui container';
  @Output() onStatePicked: EventEmitter<string> = new EventEmitter<string>();
  @Output() onOrderCriteriaPicked: EventEmitter<string> = new EventEmitter<string>();
  @Output() onStartDatePicked: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() onEndDatePicked: EventEmitter<Date> = new EventEmitter<Date>();

  startDate = new Date();
  endDate;

  constructor(private elementRef: ElementRef) {
    this.startDate = new Date();
    this.endDate = new Date();
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    $('#order').dropdown({'set selected': 'pro_cde'})
  }

  pickState(stateCode: string): void{
    this.onStatePicked.emit(stateCode);
  }

  pickStartDate(startDate: Date): void{
    console.log("START DATE: " + startDate)
    this.onStartDatePicked.emit(startDate)
  }

  pickEndDate(endDate: Date): void{
    console.log("END DATE: " + endDate)
    this.onEndDatePicked.emit(endDate)
  }

  pickOrderCriteria(criteria: string): void{
    console.log("CRITERIA: " + criteria)
    this.onOrderCriteriaPicked.emit(criteria)
  }

}
