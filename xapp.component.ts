import { Component, OnDestroy, Injectable,OnInit } from '@angular/core';
import { OperationalDataService } from './services/operational-data.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {GaugesComponent} from './gauges/gauges.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  val: any;
  assetId: number = 980320;
  dataIn: any;
  
  //the data values contained in here are passed to the child component input and in turn the child render
  //its view with these values.. like e.g: @Input() props: { waitFor: boolean; message: string; };
  // and in Parent template use the child ..eg app-root like :<app-State [props]="dashProps"><app-State'
  dashProps ={
    waitFor: true,
    message: "State"
  }
  /***********for charts.. passed down to gauges */
  cLabel=["Balaaa","Tried..", "Born", "Today"];
  dataOut:any=[];
  num: number = 0;

  gaugeConfig={
    AVGName: "",
    AVGFleet:"",
    labels:[],
    color: "#f3f1",
    level: [0,100],
    withPointer: true
  }
  /*************************************** */

  constructor(private opDataService: OperationalDataService) {
    opDataService.get(this.assetId).subscribe(data=>{ 
      this.dataIn = data;
    });
    this.val = 200;
    console.log(""+this.update());
  }
  
  ngOnInit() {
    setInterval(() => {
      //this.num += 10;
      this.gaugeConfig.level[0] += 5;
      this.gaugeConfig = Object.assign({},this.gaugeConfig);
    }, 2000);
  }

  update(){
    return this.val;
  }
  
  /***********get test data to test liveness of charts */
  miForm = new FormGroup({
    data: new FormControl('',Validators.required),
    txt: new FormControl('')
  });

  useData(miForm){
   // this.dataOut[0] = this.data.value;
    this.num = this.data.value;
  }

  get data(){
    console.log("called get..");
    return this.miForm.get("data");
  }
  get txt(){
    return this.miForm.get("txt");
  }
}
