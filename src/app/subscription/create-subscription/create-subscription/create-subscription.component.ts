import { Component, OnInit } from '@angular/core';
import { Validators,FormBuilder,FormGroup,FormControl } from '@angular/forms';
import { LanguageService } from 'src/app/services/language.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-create-subscription',
  templateUrl: './create-subscription.component.html',
  styleUrls: ['./create-subscription.component.css']
})
export class CreateSubscriptionComponent implements OnInit {
  value = "clear me";
  subscriptionForm: FormGroup;
  date = new FormControl(new Date());
  baseUrl = environment.baseUrl;
  //date = new FormControl(new Date());
  constructor(private formBuilder : FormBuilder
              ,private httpClient: HttpClient,private toastr: ToastrService) {
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

  ngOnInit(): void {
    //this.subscriptionForm.controls.receivedDate.disable();
    // this.subscriptionForm.controls.payment.disable();

  }

  submit() {
    debugger;
    console.log(this.subscriptionForm.value);

    var amount=this.subscriptionForm.value.payment;
    var memberNumber = this.subscriptionForm.value.memberNumber;
    var receivedDate = this.subscriptionForm.value.subYear;
    let subformValue = amount + memberNumber + receivedDate;
    let tokens = localStorage.getItem("access_token");
    let header = new HttpHeaders().set("Authorization", "Bearer " +tokens);
    //receivedDate="20/21/2021";
    return this.httpClient.post<any>(this.baseUrl+"/api/v1/set/subscription",subformValue,{'headers':header}
    ). subscribe ( response => {
      if(response['status']=== "1"){
        this.toastr.success("payment paid Successfully");
      }else{
        this.toastr.error("you aren't valid user");
      }
    });

  }
  clearClick(){
    //this.subscriptionForm.reset();
    setTimeout(() => this.subscriptionForm.reset(), 200);
  }
 
  getValueByMemberNumber(){
    console.log("working"+this.subscriptionForm.value.memberNumber);
    var memberNumber = this.subscriptionForm.value.memberNumber;
    
    this.httpClient.get<any>(this.baseUrl+'/get/member-number?memberNumber='+memberNumber
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
      //console.log("done");
      //console.log(data[0].memberNumberHdr);
      //this.dataSource = new MatTableDataSource<PeriodicElement>(data);
      // this.subscriptionForm = data;
      
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
