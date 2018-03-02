import { Component, OnDestroy, Injectable,OnInit } from '@angular/core';
import { OperationalDataService } from './services/operational-data.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';

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
  cLabel=["Peter", "Mugano", "Born", "Today"];

  constructor(private opDataService: OperationalDataService) {
    opDataService.get(this.assetId).subscribe(data=>{ 
      this.dataIn = data;
    });
    this.val = 200;
    console.log(""+this.update());
  }
  ngOnInit() {
   
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
    console.log("got input", this.data.value);
  }

  get data(){
    return this.miForm.get("data");
  }
}
