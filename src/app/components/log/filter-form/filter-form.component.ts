import { Component, ElementRef, EventEmitter, HostBinding, OnInit, Output} from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.css']
})
export class FilterFormComponent implements OnInit{

  @HostBinding('attr.class') cssClass = 'ui container';
  @Output() onStatePicked: EventEmitter<string> = new EventEmitter<string>();
  @Output() onStartDatePicked: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() onEndDatePicked: EventEmitter<Date> = new EventEmitter<Date>();

  startDate = new Date();
  endDate;

  constructor(private elementRef: ElementRef) {
    this.startDate = new Date();
    this.endDate = new Date();
  }

  ngOnInit() {}

  pickState(stateCode: string): void{
    this.onStatePicked.emit(stateCode);
  }

  pickStartDate(startDate: Date): void{
    console.log("HOLA")
    this.onStartDatePicked.emit(startDate)
  }

  pickEndDate(endDate: Date): void{
    console.log("HOLA")
    this.onEndDatePicked.emit(endDate)
  }

}
