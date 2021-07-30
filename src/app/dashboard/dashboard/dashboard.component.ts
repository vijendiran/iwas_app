import { Component, OnInit,AfterViewInit } from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppConstants } from 'src/app/core/utils/AppConstants';
import { environment } from 'src/environments/environment.prod';
import {DatePipe} from '@angular/common';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardData: FormGroup;
  totalMember: string;
  totalAmount : string;
  currentYearJoined : string;
  currentYearAmount : string;
  routes = AppConstants.routes;
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient,private formBuilder : FormBuilder,private router: Router,
    private toastr: ToastrService) {
    this.dashboardData = this.formBuilder.group({
      id:['0'],
      totalMember: [''],
      totalAmount: [''],
     
  pdate : new FormControl(new Date("2/1/2014")),
  pedate : new FormControl(new Date()),
  sdate : new FormControl(new Date("2/1/2015")),
  edate : new FormControl(new Date()),
    });
  }


  ngOnInit() {
    this.getTotalAmount();
      this.getTotalmember();
  }

getTotalAmount(){
  debugger;
  let tokens = localStorage.getItem("access_token");
  let header = new HttpHeaders().set("Authorization", "Bearer " +tokens);
  
  var sdates = this.dashboardData.value.sdate;
  let syear = sdates.getFullYear();

  let totalend = this.dashboardData.value.edate;

  let eyear=totalend.getFullYear();

  this.httpClient.get<any>(this.baseUrl+'/v1/get/dashboard/total-amount?fromYear='+syear+'&toYear='+eyear,{'headers':header}).subscribe(data => {

    console.log(data);
    this.dashboardData.controls.totalAmount.setValue(data.message);
    this.totalAmount=data.message;
   
  }) 
}
getTotalmember(){
  debugger;
  let totalends = this.dashboardData.value.pdate;
  let totalend = this.dashboardData.value.pedate;
  let tokens = localStorage.getItem("access_token");
  let header = new HttpHeaders().set("Authorization", "Bearer " +tokens);
  // var sdate = new Date("2/1/2014");
  var sdate = new Date(totalends).getFullYear()+'-'+("0"+(new Date(totalends).getMonth()+1)).slice(-2)+'-'+("0"+new Date(totalends).getDate()).slice(-2);
  var eyear = new Date(totalend).getFullYear()+'-'+("0"+(new Date(totalend).getMonth()+1)).slice(-2)+'-'+("0"+new Date(totalend).getDate()).slice(-2);

  this.httpClient.get<any>(this.baseUrl+'/v1/get/dashboard/total-member?fromDate='+sdate+'&toDate='+eyear,{'headers':header}).subscribe(data => {

    console.log(data);
    this.dashboardData.controls.totalMember.setValue(data.message);
    this.totalMember=data.message;
  })    
}

}
