import { Component, OnInit ,Input} from '@angular/core';
import {Chart} from 'chart.js';

@Component({
  selector: 'gauge',
  templateUrl: './gauges.component.html',
  styleUrls: ['./gauges.component.css']
})
export class GaugesComponent implements OnInit {
  chart =  [];
  chart2 = [];
  chart3 = [];
  
  icons = ["./assets/KMP/connect-yes_sm.svg",
          "./assets/KMP/connect-disposed_sm.svg",
          "./assets/KMP/connect-no_sm.svg",
          "./assets/KMP/connect-not.svg"];
  
  labels = ["Connected","Unreliable","Disconnected","Disposed:no"];

  pointerData=[100,70];

  @Input() cLabels = [];
  constructor() { 
    
  }
  ngOnInit() {
    this.chart = new Chart('canv', {
      type: 'pie',
      data: {
        labels: ["low","high"],
        datasets: [
          { 
            data: this.pointerData,
            backgroundColor: ["#3cba9f","#9cbf9f"]
          }
         
        ]
      },
      options: {
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI,
        cutoutPercentage: 80,
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
            data: this.pointerData,
            //backgroundColor: ["#fff","#f3f1"],
            backgroundColor:["rgba(0, 0, 0, 0)", "rgba(255, 254, 230, 0)"],
            borderColor: ["#10def","#9cbf9f"],
            borderWidth: [0,2],
           
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
    // inner 2
    this.chart3 = new Chart('canvasY', {
      type: 'pie',
      data: {
        labels: ["low","high"],
        datasets: [
          { 
            data: this.pointerData,
            //backgroundColor: ["#f3f1","#fff"],
            backgroundColor:["rgba(255, 254, 230, 0)","rgba(0, 0, 0, 0)"],
            borderColor: ["#fff","#fff"],
            borderWidth: [0,0],
           
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
