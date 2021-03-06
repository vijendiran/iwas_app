import { Component, OnInit ,HostListener} from '@angular/core';
import {FormControl, Validators,FormGroup,FormArray, FormBuilder} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import jwt_decode from "jwt-decode";
@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit {

  hide = true;
  userForm:FormGroup;
  value:any;
  lang:any;
  seten:any;
  constructor(public _authservice:AuthService,public toastr:ToastrService, private formBuilder: FormBuilder,public translate:TranslateService, public router: Router
  ) {
    this.userForm = new FormGroup({
      'userId': new FormControl ('',Validators.required),
      'password' : new FormControl('',Validators.required)
    })
   }

  ngOnInit() {

  }

  userId = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  gerErrorForpwd(){

    if (this.password.hasError('required')){
      return 'You must enter Your password';
    }
    return this.password.hasError('password') ? 'Not a valid password' : '';
  }
  getErrorMessage() {
    if (this.userId.hasError('required')) {
      return 'You must enter a value';
    }

    return this.userId.hasError('email') ? 'Not a valid email' : '';

  }

  onsubmitsform(){
    debugger;
    if(this.userForm.valid){
  this._authservice.checkvalidation(this.userForm.value);

    }
    else{
      this.toastr.error("Please enter username & password");
    }
}
keyDownFunction(event) {
  if (event.keyCode === 13) {
   this.onsubmitsform();
  }
}
  submitForm(){
    debugger;
    console.log(this.userForm.value);
    // this._authservice.checkvalidation();
     this._authservice.Checklogin(this.userForm.value).subscribe(data=>{
      if (this.userForm.valid) {
        console.log("success",JSON.stringify(data));
        return;
    }

     }
     ,
     (err)=>{
      console.log("failed",JSON.stringify(err));
     });

  }
  onSubmitform(){

    console.log(this.userForm.value);
  }
 

  onForgotPasswordClick(event){
    event.preventDefault();
    event.stopPropagation();
    this.toastr.info("Contact Admin")
    }
  
}
