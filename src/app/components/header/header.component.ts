import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @HostBinding('attr.class') cssClass = 'ui top fixed borderless menu';

  constructor() { }

  ngOnInit() {
  }

}
