import { Component, OnInit } from '@angular/core';
import { Validators,FormBuilder,FormGroup,FormControl } from '@angular/forms';
import { LanguageService } from 'src/app/services/language.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {FormGroupDirective } from '@angular/forms';
import { ViewChild } from '@angular/core'
@Component({
  selector: 'app-create-subscription',
  templateUrl: './create-subscription.component.html',
  styleUrls: ['./create-subscription.component.css']
})

export class CreateSubscriptionComponent implements OnInit {
  //date

  date = new Date();
  chosenYearDate: Date;
  chosenMonthDate: Date = new Date(2020,0,1);
  chosenSemesterDate: Date;
  chosenWeekDate: Date;
  chosenDate: Date;
  monthInputCtrl: FormControl = new FormControl(new Date(2020,0,1));

  visible = true;
  //date
  value = "clear me";
  subscriptionForm: FormGroup;

  baseUrl = environment.baseUrl;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  constructor(private formBuilder : FormBuilder
              ,private httpClient: HttpClient,private toastr: ToastrService,public _router:Router) {
    this.subscriptionForm = this.formBuilder.group({
      id:['0'],
      payment:['500',Validators.required],
      memberNumber: ['',Validators.required],
      subYear:['',Validators.required],
      aadharNumber: ['' ],
      receivedDate:[''],
   
      designation: ['' ],
      subscribeType: [''],
      memberName: [''  ],
      fatherName: [''  ],
      permanentAddress: ['' ],
      permanentCity: [''],
      mobileNumber: ['' ],
      whatsappNumber: [''],
      aadharNo:[''],
      currentAddress: ['' ],
      currentCity: [''],
       });
  }
  minDate = new Date().getFullYear();
  maxDate = new Date().getFullYear();

  ngOnInit(): void {
    //this.subscriptionForm.controls.receivedDate.disable();
    // this.subscriptionForm.controls.payment.disable();

  }

  submit() {
    debugger;
    console.log(this.subscriptionForm.value);

    
    var memberNumber = this.subscriptionForm.value.memberNumber;


     var payment =  this.subscriptionForm.value.payment;

    var date = this.subscriptionForm.value.subYear;
    let year = date.getFullYear();
    var amount= {
      "amount": payment,
      "memberNumber":memberNumber,
      "subscriptionYear": year
    }
    let tokens = localStorage.getItem("access_token");
    let header = new HttpHeaders().set("Authorization", "Bearer " +tokens);
    return this.httpClient.post<any>(this.baseUrl+"/v1/set/subscription",amount,{'headers':header}
    ). subscribe ( response => {
      if(response['status']=== "1"){
        this.toastr.success("payment paid Successfully");
      }else{
        this.toastr.error("you aren't valid user");
      }
      this.clearForms();
    });

  }
  clearForms(){
  setTimeout(() => 
      this.formGroupDirective.resetForm(), 0)
}
  clearForm() {
debugger;
    this.subscriptionForm.reset({
      payment:[''],
      memberNumber: [''],
      subYear:[''],
      aadharNumber: ['' ],
      receivedDate:[''],
   
      designation: ['' ],
      subscribeType: [''],
      memberName: [''  ],
      fatherName: [''  ],
      permanentAddress: ['' ],
      permanentCity: [''],
      mobileNumber: ['' ],
      whatsappNumber: [''],
      aadharNo:[''],
      currentAddress: ['' ],
      currentCity: [''],
         });
    }
  getValueByMemberNumber(){
    debugger;
    console.log("working"+this.subscriptionForm.value.memberNumber);
    var memberNumber = this.subscriptionForm.value.memberNumber;
    let tokens = localStorage.getItem("access_token");
    let header = new HttpHeaders().set("Authorization", "Bearer " +tokens);
    this.httpClient.get<any>(this.baseUrl+'/v1/get/member-detail?memberNumber='+memberNumber,{'headers':header}
    ).subscribe(data => {
      console.log(data);
      this.subscriptionForm.controls.memberName.setValue(data.memberName);
      this.subscriptionForm.controls.fatherName.setValue(data.fatherName);
      this.subscriptionForm.controls.permanentAddress.setValue(data.permanentAddress);
      this.subscriptionForm.controls.permanentCity.setValue(data.permanentCity);
      this.subscriptionForm.controls.mobileNumber.setValue(data.mobileNumber);
      this.subscriptionForm.controls.whatsappNumber.setValue(data.whatsappNumber);
      this.subscriptionForm.controls.aadharNo.setValue(data.aadharNo);
      this.subscriptionForm.controls.currentAddress.setValue(data.currentAddress);
      this.subscriptionForm.controls.currentCity.setValue(data.currentCity);
      
    });

  }
  getValueByAadharNumber(){
    console.log("working"+this.subscriptionForm.value.aadharNumber);
    var aadharNumber = this.subscriptionForm.value.aadharNumber;
    this.httpClient.get<any>(this.baseUrl+'/get/aadhar-number?aadharNumber='+aadharNumber
    ).subscribe(data => {
      console.log(data);
      this.subscriptionForm.controls.memberName.setValue(data.memberName);
      this.subscriptionForm.controls.fatherName.setValue(data.fatherName);
      this.subscriptionForm.controls.permanentAddress.setValue(data.permanentAddress);
      this.subscriptionForm.controls.permanentCity.setValue(data.permanentCity);
      this.subscriptionForm.controls.mobileNumber.setValue(data.mobileNumber);
      this.subscriptionForm.controls.whatsappNumber.setValue(data.whatsappNumber);
      this.subscriptionForm.controls.aadharNo.setValue(data.aadharNo);
      this.subscriptionForm.controls.currentAddress.setValue(data.currentAddress);
      this.subscriptionForm.controls.currentCity.setValue(data.currentCity);
      
    });

  }
}
