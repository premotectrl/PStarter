import { Injectable, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import {Observable} from 'rxjs/Observable'

export interface IResponse{

} 

const getUrlBasePrefix = "https://www-dev.kuka-atx.com/api";
//const testUrl = "http://headers.jsontest.com/";
const  testUrl = "https://jsonplaceholder.typicode.com/posts";
 
@Injectable()
export class DeviceManagementService implements OnInit{
  data:any;
  private getAllUrl:string;
  private siteId:string; // = "OlhNIbEUSUW4hJYPyy24Pg";
  private deviceUrl:string;
  private assetId= "980321";

  constructor(private http: HttpClient) {
   // this.getAllUrl = getUrlBasePrefix  +  '/devices/site/' + this.siteId;
    //this.deviceUrl = getUrlBasePrefix  + '/devices/' +  this.assetId;
    //this.deviceUrl = 'devices/' +  this.assetId +'/properties';
  }
 
  ngOnInit(){ 
    
  }
  set siteID(siteId){
    this.siteId = siteId;
  }
  set assetID(assetId){
    this.assetId = assetId;
  }

  getDevice(deviceId){
    console.log("called....");
    this.assetID = deviceId;
   // this.deviceUrl = 'devices/' +  this.assetId;
    this.deviceUrl = getUrlBasePrefix  + '/devices/' +  this.assetId +'/properties';
    return this.http.get(this.deviceUrl);
  }

  getAllDevices(siteId){
    this.siteID = siteId;
    this.getAllUrl = getUrlBasePrefix  +  '/devices/site/' + this.siteId;
    return this.http.get<any>(this.getAllUrl);
  }
}
