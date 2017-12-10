import {Directive, ElementRef, OnInit} from '@angular/core';

declare var $: any;

@Directive({
  selector: '.ui.dropdown'
})
export class DropdownDirective implements OnInit{

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    $(this.elementRef.nativeElement).dropdown();
  }

}
