import { Component, OnInit, OnChanges, Input, SimpleChanges, SimpleChange } from '@angular/core';
import { Chart } from 'chart.js';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'gauge',
  templateUrl: './gauges.component.html',
  styleUrls: ['./gauges.component.css']
})

export class GaugesComponent implements OnInit, OnChanges {

  chart = [];
  chart2 = [];
  chart3 = [];

  icons = ["./assets/KMP/connect-yes_sm.svg",
    "./assets/KMP/connect-disposed_sm.svg",
    "./assets/KMP/connect-no_sm.svg",
    "./assets/KMP/connect-not.svg"];

  levelIcons =["./assets/KMP/battery-0-10_sm.svg","./assets/KMP/battery-11-25_sm.svg",
  "./assets/KMP/battery-26-50_sm.svg","./assets/KMP/battery-51-75_sm.svg",
  "./assets/KMP/battery-76+_sm.svg"];

  iconPathIndex = null;

  cLabels = ["Connected", "Unreliable", "Disconnected", "Disposed:no"];
  /******predifined colors *****/
  color = ["#CF2027","#FF5800","#FFCD00","#6EC8A0","#1B8642"];

 // private _data = new BehaviorSubject<any>(1);
  _data:any;

  @Input() pointerDataX:any;

  @Input() gaugeConfigX ={
    color: String,
    level: Number,
    withPointer: Boolean
  }
  @Input() set gaugeConfig(data){
    //this._data.next(data);
    this._data = data;
  }

  get config() {
    // get the latest value from _data BehaviorSubject
    //return this._data.getValue();
    return this._data;
  }

  //pointerData:any=[2,100];

  constructor() {}

  ngOnInit() {
    
    //this._data.subscribe(x=>{ console.log(this.config);
      this.makeChart(this.config);
   // });
  }

  ngOnChanges(changes: SimpleChanges) {
    //const dVal: SimpleChange = changes.pointerDataX;
    const dVal: SimpleChanges = changes.gaugeConfig.currentValue;
    if (dVal != undefined){  
      this.updateChart(this.chart,dVal,true);
      this.updateChart(this.chart2,dVal,false);
      this.updateChart(this.chart3,dVal,false);    
    }

  }
 
  private updateChart(updchart, newValue, color) {
    let value = newValue.level[0];
    let percentage = Math.abs(100 - value);
    updchart.data.datasets[0].data[0] = value;
    updchart.data.datasets[0].data[1] = percentage;
    //chage colors according to input levels or percentages..
    if (color == true) {
      if (value <= 10) {
        updchart.data.datasets[0].backgroundColor[0] = this.color[0];
        this.iconPathIndex = 0;
      } else if (value >= 11 && value <= 25) {
        updchart.data.datasets[0].backgroundColor[0] = this.color[1];
        this.iconPathIndex = 1;
      } else if (value >= 26 && value <= 50) {
        updchart.data.datasets[0].backgroundColor[0] = this.color[2];
        this.iconPathIndex = 2;
      } else if (value >= 51 && value <= 75) {
        updchart.data.datasets[0].backgroundColor[0] = this.color[3];
        this.iconPathIndex = 3;
      } else if (value >= 76) {
        updchart.data.datasets[0].backgroundColor[0] = this.color[4];
        this.iconPathIndex = 4;
      }
    }
    updchart.options.title.text = newValue.level[0] + "%";
    updchart.update();
  }

  private makeChart(gaugeConfig) {
    if (gaugeConfig.withPointer == false) {
      this.chart = new Chart('canv', {
        type: 'pie',
        data: {
          //labels: ["low", "high"],
          datasets: [
            {
              data: gaugeConfig.level,//this.pointerData,
              backgroundColor: ["#3cba9f", "#A9A9A9"]
            }

          ]
        },
        options: {
          rotation: 1 * Math.PI,
          circumference: 1 * Math.PI,
          cutoutPercentage: 60,
          tooltips: { enabled: false },
          hover: { mode: null },

          legend: {
            display: false
          }
        }
      });
    } else {
      this.chart = new Chart('canv', {
        type: 'pie',
        data: {
          datasets: [
            {
              data: gaugeConfig.level,//this.pointerData,
              backgroundColor: ["#3cba9f", "#A9A9A9"]
            }
          ]
        },
        options: {
          rotation: 1 * Math.PI,
          circumference: 1 * Math.PI,
          cutoutPercentage: 80,
          tooltips: { enabled: false },
          hover: { mode: null },

          legend: {
            display: false
          }
        }
      });
      //Inner chart
      this.chart2 = new Chart('canvas', {
        type: 'pie',
        data: {
          datasets: [
            {
              data: gaugeConfig.level,//this.pointerData,
              backgroundColor: ["rgba(0, 0, 0, 0)", "rgba(255, 254, 230, 0)"],
              borderColor: ["#10def", "#9cbf9f"],
              borderWidth: [0, 2],

            }
          ]
        },
        options: {
          rotation: 1 * Math.PI,
          circumference: 1 * Math.PI,
          //cutoutPercentage: 60,
          //radiusPercentage: 0.5,
          tooltips: { enabled: false },
          hover: { mode: null },

          legend: {
            display: false
          }
        }
      });
      // inner 2
      this.chart3 = new Chart('canvasY', {
        type: 'pie',
        data: {
          labels: ["low", "high"],
          datasets: [
            {
              data: gaugeConfig.level,//this.pointerData,
              backgroundColor: ["rgba(255, 254, 230, 0)", "rgba(0, 0, 0, 0)"],
              borderColor: ["#fff", "#fff"],
              borderWidth: [0, 0],

            }
          ]
        },
        options: {
          rotation: 1 * Math.PI,
          circumference: 1 * Math.PI,
          tooltips: { enabled: false },
          hover: { mode: null },
          title: {
            display: true,
            position: "bottom",
            fontfamily: "Neutra",
            text: ''
          },
          legend: {
            display: false
          }
        }
      });
    }
}

/*private makeChart(gaugeConfig) {
  if (gaugeConfig.withPointer == false) {
    this.chart = new Chart('canv', {
      type: 'pie',
      data: {
        //labels: ["low", "high"],
        datasets: [
          {
            data: this.pointerData,
            backgroundColor: ["#3cba9f", "#A9A9A9"]
          }

        ]
      },
      options: {
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI,
        cutoutPercentage: 80,
        tooltips: { enabled: false },
        hover: { mode: null },

        legend: {
          display: false
        }
      }
    });
  } else {
    this.chart = new Chart('canv', {
      type: 'pie',
      data: {
        //labels: ["low", "high"],
        datasets: [
          {
            data: this.pointerData,
            backgroundColor: ["#3cba9f", "#A9A9A9"]
          }

        ]
      },
      options: {
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI,
        cutoutPercentage: 80,
        tooltips: { enabled: false },
        hover: { mode: null },

        legend: {
          display: false
        }
      }
    });
    //Inner chart
    this.chart2 = new Chart('canvas', {
      type: 'pie',
      data: {
        //labels: ["low", "high"],
        datasets: [
          {
            data: this.pointerData,
            //backgroundColor: ["#fff","#f3f1"],
            backgroundColor: ["rgba(0, 0, 0, 0)", "rgba(255, 254, 230, 0)"],
            borderColor: ["#10def", "#9cbf9f"],
            borderWidth: [0, 2],

          }
        ]
      },
      options: {
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI,
        //cutoutPercentage: 60,
        //radiusPercentage: 0.5,
        tooltips: { enabled: false },
        hover: { mode: null },

        legend: {
          display: false
        }
      }
    });
    // inner 2
    this.chart3 = new Chart('canvasY', {
      type: 'pie',
      data: {
        labels: ["low", "high"],
        datasets: [
          {
            data: this.pointerData,
            //backgroundColor: ["#f3f1","#fff"],
            backgroundColor: ["rgba(255, 254, 230, 0)", "rgba(0, 0, 0, 0)"],
            borderColor: ["#fff", "#fff"],
            borderWidth: [0, 0],

          }
        ]
      },
      options: {
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI,
        //cutoutPercentage: 60,
        //radiusPercentage: 0.5,
        tooltips: { enabled: false },
        hover: { mode: null },
        title: {
          display: true,
          position: "bottom",
          text: ''
        },
        legend: {
          display: false
        }
      }
    });
  }
} */

}
