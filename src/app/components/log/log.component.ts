import {AfterViewChecked, AfterViewInit, Component, HostBinding, Input, OnInit} from '@angular/core';
import {LogItem} from "./log-item/log-item.model";
import {LogService} from "../../services/log.service";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {PaginationInstance} from "ngx-pagination";
import { Chart } from 'chart.js';

declare var $;

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit, AfterViewInit {

  @HostBinding('attr.class') cssClass = 'ui container';
  logItems: LogItem[];
  requestPerMachineData : any[] = [
    {data: [0, 0, 0, 0], label: 'Machines'}
  ];
  requestPerMachineLabels: string[] =  ["JAX02", "BDU02", "JAX01", "BDU01"];

  requestPerComplianceStatusData: any[] = [
    {data: [0, 0, 0, 0], label: 'Compliance Status'}
  ];

  requestPerComplianceStatusLabels: string[] =  ["IN_PROG", "COMPL", "NOT_FOUND"];

  averageTimeChartData: any[] = [
    {data: [0, 0, 0, 0], label: 'Average time per day'}
  ];

  responseTimes: number[] = [];

  averageTimeChartLabels: string[] = ["1", "2", "3"];

  responseTime: number = 0;

  previousMachineChart;
  previousCSPRChart;
  previousAverageTimeChart;

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
    const actualDateString = (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
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
    let initTime = new Date();
    this.logService.getLogs(startDate, endDate, stateCode)
      .subscribe(results => {
        let endTime = new Date();
        this.responseTime = (endTime.getTime() - initTime.getTime()) / 1000;
        this.responseTimes.push(this.responseTime);
        this.loading = false;
        console.log(results.length)
        this.numberOfPages = results.length;
        this.logItems = results;
        this.updateRequestPerMachineData();
        this.updateRequestsPerComplianceStatusGraph();
        this.updateAverageTimeGraph();
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

  updateRequestPerMachineData(): void{

    let requestPerMachineData = [];
    for(let log of this.logItems){
      let machine = log['cd_machine'];
      if(requestPerMachineData[machine] != null){
        requestPerMachineData[machine] = requestPerMachineData[machine] + 1;
        console.log(machine+" COUNT: "+requestPerMachineData[machine]);
      }

      if (requestPerMachineData[machine] == null)
        requestPerMachineData[machine] = 1;
    }
    const machineNames = Object.keys(requestPerMachineData);
    let index = 0;
    let data = [];
    let labels = [];
    for(let machineName of machineNames){
      data[index] = requestPerMachineData[machineName];
      labels[index] = machineName;
      //console.log(index +" : "+machineName)
      index++;
    }
    this.requestPerMachineData = [0]['data'] = data;
    //console.log(labels);
    this.requestPerMachineLabels = [];
    this.requestPerMachineLabels = labels;
    if (this.previousMachineChart)
      this.previousMachineChart.destroy();
    var ctx = document.getElementById("machines-chart");
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Machines',
          data: data,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }]
        }
      }
    });
    this.previousMachineChart = myChart;
  }

  updateAverageTimeGraph(): void{
    let labels = [];
    let index = 0;
    for(let time of this.responseTimes){
      labels[index] = index;
      index++;
    }
    if (this.previousAverageTimeChart)
      this.previousAverageTimeChart.destroy();
    var ctx = document.getElementById("time-chart");
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Average time per day',
          data: this.responseTimes,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }]
        }
      }
    });

    this.previousAverageTimeChart = myChart;
  }

  updateRequestsPerComplianceStatusGraph(): void{
    let requestPerComplianceStatusData = [];
    for(let log of this.logItems){
      let complianceStatus = log['ds_compl_status_returned'];
      if(requestPerComplianceStatusData[complianceStatus] != null){
        requestPerComplianceStatusData[complianceStatus] = requestPerComplianceStatusData[complianceStatus] + 1;
      }

      if (requestPerComplianceStatusData[complianceStatus] == null)
        requestPerComplianceStatusData[complianceStatus] = 1;
    }
    const complianceStatus = Object.keys(requestPerComplianceStatusData);
    let index = 0;
    let data = [];
    let labels = [];
    for(let machineName of complianceStatus){
      data[index] = requestPerComplianceStatusData[machineName];
      labels[index] = machineName;
      //console.log(index +" : " + machineName)
      index++;
    }

    this.requestPerComplianceStatusData = [0]['data'] = data;
    //console.log(labels);
    this.requestPerComplianceStatusData = [];
    this.requestPerComplianceStatusLabels = labels;
    if (this.previousCSPRChart)
      this.previousCSPRChart.destroy();
    var ctx = document.getElementById("rpcs-chart");
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'RPCS',
          data: data,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }]
        }
      }
    });

    this.previousCSPRChart = myChart;
  }



}
