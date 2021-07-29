import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppConstants } from 'src/app/core/utils/AppConstants';
import { environment } from 'src/environments/environment.prod';
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
      totalMember: ['']
    });
  }
  ngOnInit() {
    this.httpClient.get<any>(this.baseUrl+'/get/dashboard').subscribe(data => {
        console.log(data);
        this.dashboardData.controls.totalMember.setValue(data.totalMember);
        this.totalMember=data.totalMember;
        this.totalAmount = data.totalAmount;
        this.currentYearJoined = data.currentYearJoined;
        this.currentYearAmount = data.currentYearAmount;
    })        
  }

}
