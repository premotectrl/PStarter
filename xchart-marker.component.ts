import { Component, OnInit, OnChanges, Input, SimpleChanges, SimpleChange } from '@angular/core';
import {Chart} from 'chart.js';

@Component({
  selector: 'charter',
  templateUrl: './chart-marker.component.html',
  styleUrls: ['./chart-marker.component.css']
})
/**** added  *****/
@Input('chartConfig') chartConfig = {
  legendIconPaths: [],
  legendText:[],
  data:[],
  backgroundColor:[] 
}

export class ChartMarkerComponent implements OnInit OnChanges{
  chart = [];
  chartX = [];
  iconPath: String = "./assets/KMP/connect-graph.svg";
  /**************Legend ***/
  icons = ["./assets/KMP/connect-yes_sm.svg",
          "./assets/KMP/connect-disposed_sm.svg",
          "./assets/KMP/connect-no_sm.svg",
          "./assets/KMP/connect-unreliable.svg"];
          
  labels = ["Connected","Unreliable","Disconnected","Disposed:no data"];
  data = [30,40,20,10];
  backgroundColor = ["#1B8642","#6EC8A0","#CF2027","#D1D3D5"];

 /* chartOptions = {
    responsive: true,
  };

  chartData = [
    { data: [30,40, 20,10], 
      label: 'Connection',
    
      backgroundColor: ["#3e95cd","#6EC8A0","#CF2027","#D1D3D5"]}
  ];

  chartLabels = ["Connected","Unreliable","Disconnected","Disposed:no data"];

  myColors = [
    {
      backgroundColor:  ["#1B8642","#6EC8A0","#CF2027","#D1D3D5"]
     
    }];

  onChartClick(event) {
    console.log(event);
  }
  */
  constructor() {}

  ngOnInit() {
   this.makeChart();
  }

  ngOnchanges(changes: SimpleChanges){
  const dVal: SimpleChanges = changes.chartConfig.currentValue;
    this.updateChart(this.chart);
  }
  private makeChart(){
   this.chart = new Chart('canvasZ', {
      type: 'doughnut',
      data: {
       // labels: ["Connected","Unreliable","Disconnected","Disposed:no data"],
       labels:this.labels,
        datasets: [
          { 
            //data: [30,40,20,10],
            data:this.data,
            //backgroundColor: ["#1B8642","#6EC8A0","#CF2027","#D1D3D5"]
            backgroundColor:this.backgroundColor
          }
        ]
      },
      options: {
         cutoutPercentage: 70,
        legend: {
          display: false
        }
      }
    });
  }
  private updateChart(updChart, newData){
    updchart.data.datasets[0].data = newData.data;
    updChart.update();
  }
}
