import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.css']
})
export class BarGraphComponent implements OnInit {

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  @Input() public barChartLabels: string[];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  @Input() public barChartData;

  constructor() { }

  ngOnInit() {
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
