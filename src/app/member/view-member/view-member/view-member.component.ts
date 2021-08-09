import {  OnInit } from '@angular/core';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { LanguageService } from 'src/app/services/language.service';
import { FormBuilder } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-member',
  templateUrl: './view-member.component.html',
  styleUrls: ['./view-member.component.css']
})
export class ViewMemberComponent implements AfterViewInit,OnInit {
  public edited = false;
  displayedColumns: string[] = ['joiningDate', 'memberNumber', 'designation'
  , 'memberName', 'fatherName', 'permanentAddress'
  , 'permanentCity', 'mobileNumber', 'whatsappNumber'
  , 'aadharNumber', 'currentAddress', 'currentCity','operation'];
baseUrl = environment.baseUrl;
dataSource = new MatTableDataSource<PeriodicElement>();

private data:any = []
constructor(private formBuilder : FormBuilder
  ,private httpClient: HttpClient, public toastr:ToastrService,public _auth:AuthService,public _router:Router) {

}
ngOnInit(){
  debugger;
  this.isAdmin();
}
isAdmin(){
  debugger;
  let role = localStorage.getItem("role");
  if(role=='admin'){
    this.edited=true;
  }

}
onClickMem(event) {
  debugger;
  var target = event.target || event.srcElement || event.currentTarget;
  var idAttr = target.attributes.id;
  var value = idAttr.nodeValue;
 console.log(value);
 localStorage.setItem("editMemId",value);
 this._router.navigate(['/create-member']);
}
myClickHandler(memberNumber:any){
  debugger;
  console.log(memberNumber.value);
  let tokens = localStorage.getItem("access_token");
  let header = new HttpHeaders().set("Authorization", "Bearer " +tokens);
  this.httpClient.delete(this.baseUrl+'/v1/del',{'headers':header})
  .subscribe ( response => {
    if(response){
      console.log(response);
      this.data=response;
      if(response['status']=== "1"){
        this.toastr.success("deleted Successfully");
      }else{
        this.toastr.error("not found");
      }
    }
    
  });
}

// @ts-ignore
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
// @ts-ignore
@ViewChild(MatSort, { static: true }) sort: MatSort;

ngAfterViewInit() {
  let tokens = localStorage.getItem("access_token");
  let header = new HttpHeaders().set("Authorization", "Bearer " +tokens);

  this.httpClient.get<any>(this.baseUrl+'/v1/get/all-member',{'headers':header}
  ).subscribe(data => {
    console.log(data);
    //console.log("done");
    //console.log(data[0].memberNumberHdr);
    this.dataSource = new MatTableDataSource<PeriodicElement>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  });

  }
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
}
export interface PeriodicElement {
joiningDate: string;
memberNumber: string;
designation: string;
memberName: string;
fatherName: string;
permanentAddress: string;
permanentCity: string;
mobileNumber: string;
whatsappNumber: string;
aadharNumber: string;
currentAddress: string;
currentCity: string;
operation:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
{
  joiningDate: '01-06-2015',
  memberNumber: '1',
  designation: 'Admin',
  memberName: 'Hilur Mohamed (raja)',
  fatherName:'Abdul Gaffoor',
  permanentAddress: 'Kaithey Millath Nagar',
  permanentCity: 'Swamimalai',
  mobileNumber: '96598095528',
  whatsappNumber: '96598095528',
  aadharNumber: '',
  currentAddress: '',
  currentCity: 'KUWAIT',
  operation:'edit'
}

];

