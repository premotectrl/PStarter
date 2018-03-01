import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js';

@Component({
  selector: 'gauge',
  templateUrl: './gauges.component.html',
  styleUrls: ['./gauges.component.css']
})
export class GaugesComponent implements OnInit {
  chart =  [];
  chart2 = [];
  constructor() { 
    
  }
  ngOnInit() {
    this.chart = new Chart('canv', {
      type: 'doughnut',
      data: {
        labels: ["low","high"],
        datasets: [
          { 
            data: [10,90],
            backgroundColor: ["#3cba9f","#9cbf9f"]
          }
        ]
      },
      options: {
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI,
        legend: {
          display: false
        }
      }
    });
    //Inner chart
    this.chart2 = new Chart('canvas', {
      type: 'pie',
      data: {
        labels: ["low","high"],
        datasets: [
          { 
            data: [10,90],
            backgroundColor: ["#1fd6ef","#f3f1"],
            borderColor: ["#fff","#fff"],
            borderWidth: [0,1],
           
          },
          { 
            data: [10,90],
            backgroundColor: ["#fff","#fff"],
            borderColor: ["#fff","#fe86ef"],
            borderWidth: [0,1]
          }
        ]
      },
      options: {
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI,
        //cutoutPercentage: 60,
        //radiusPercentage: 0.5,
        tooltips: {enabled: false},
        hover: {mode: null},
        legend: {
          display: false
        }
      }
    });
  }

}
