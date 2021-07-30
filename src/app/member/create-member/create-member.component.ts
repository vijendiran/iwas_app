import { Component, OnInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import {FormControl, Validators,FormGroup,FormArray, FormBuilder} from '@angular/forms';
import { LanguageService } from 'src/app/services/language.service';
import { observable } from 'rxjs';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-create-member',
  templateUrl: './create-member.component.html',
  styleUrls: ['./create-member.component.css']
})
export class CreateMemberComponent implements OnInit {
  value="clear me";
  memberForm : FormGroup;
  private data:any = []
  baseUrl = environment.baseUrl;
  token:any;
  //date = new FormControl(new Date());
  constructor(private formBuilder : FormBuilder,
    private httpClient: HttpClient,private toastr: ToastrService) {
      
    this.memberForm = this.formBuilder.group({
      joiningDate:['' , Validators.required],
      memberNumber: ['' , Validators.required],
      designation: ['' , Validators.required],
      subscribeType: ['Yearly'],
      memberName: ['' , Validators.required],
      fatherName: ['' , Validators.required],
      permanentAddress: ['' , Validators.required],
      permanentCity: ['' , Validators.required],
      mobileNumber: ['' , Validators.required],
      whatsappNumber: [''],
      aadharNumber: [''],
      currentAddress: [''],
      currentCity: ['' ],
       });
  }

  ngOnInit(): void {
    // debugger;
    // this.membershipForm.controls.joiningDateHdr.disable();
    // this.membershipForm.controls.memberNumberHdr.disable();
    // this.membershipForm.controls.designationHdr.disable();
    // this.membershipForm.controls.subscribeTypeHdr.disable();
    this.getValueByMemberNumber();
  }

  submit() {
  debugger;
    if(this.memberForm.invalid){
      return this.toastr.error("Kindly Fill the necessary field");
      // return;
    }
    console.log(this.memberForm.value);
    
    let tokens = localStorage.getItem("access_token");
    let header = new HttpHeaders().set("Authorization", "Bearer " +tokens);

    return this.httpClient.post<any>(this.baseUrl+"/v1/set/member",this.memberForm.value,{'headers':header}
    ). subscribe ( response => {
      if(response){
        console.log(response);
        this.data=response;
        if(response['status']=== "1"){
          this.toastr.success("Data Saved Successfully");
        }else{
          this.toastr.error("Member Number Already Exist Check the member sheet");
        }
        this.clearClick();
      }
      
    });
  }
  clearClick(){
    this.memberForm.reset();
  }
  enableOther(){
    debugger;
    alert("test");
  }
  getValueByMemberNumber(){
    // debugger;

    let memNum = localStorage.getItem("editMemId");
    if(memNum !=="null"){
    let tokens = localStorage.getItem("access_token");
    let header = new HttpHeaders().set("Authorization", "Bearer " +tokens);
    this.httpClient.get<any>(this.baseUrl+'/v1/get/member-detail?memberNumber='+memNum,{'headers':header}
    ).subscribe(data => {
      console.log(data);
      this.memberForm.controls.memberName.setValue(data.memberName);
      this.memberForm.controls.fatherName.setValue(data.fatherName);
      this.memberForm.controls.permanentAddress.setValue(data.permanentAddress);
      this.memberForm.controls.permanentCity.setValue(data.permanentCity);
      this.memberForm.controls.mobileNumber.setValue(data.mobileNumber);
      this.memberForm.controls.whatsappNumber.setValue(data.whatsappNumber);
      this.memberForm.controls.aadharNo.setValue(data.aadharNo);
      this.memberForm.controls.currentAddress.setValue(data.currentAddress);
      this.memberForm.controls.currentCity.setValue(data.currentCity);
      //console.log("done");
      //console.log(data[0].memberNumberHdr);
      //this.dataSource = new MatTableDataSource<PeriodicElement>(data);
      // this.subscriptionForm = data;
      
    });
this.clearClick();
  }
  }
}
