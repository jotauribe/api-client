import {Directive, ElementRef, OnInit} from '@angular/core';

declare var $: any;

@Directive({
  selector: '.ui.calendar'
})
export class CalendarDirective implements OnInit{

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    $('.ui.calendar').calendar({type: 'date', getFirstDayOfWeek: 1, initialDate: null});
  }

}
