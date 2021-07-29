import { Injectable } from '@angular/core';
import { HttpClientModule,HttpClient, HttpParams,HttpInterceptor,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { decode } from 'punycode';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public _http:HttpClient,public router:Router, private formBuilder: FormBuilder) { }
  baseUrl = environment.baseUrl;
  postId:any;
  memberForm:FormGroup;
  userForm: FormGroup;

  loggedIn(){
    return !!localStorage.getItem('user');
  }

  checkvalidation(loginData:any) {   
    debugger; 
    // Simple POST request with a JSON body and response type <any>
    this._http.post<{accessToken:  string}>(this.baseUrl+"/login",loginData).subscribe(data => {
      localStorage.setItem('access_token', data.accessToken);
    this.decodeToken();
    })
}
decodeToken(){
  let gettoken = localStorage.getItem("access_token");
  var decoded = jwt_decode(gettoken);
  console.log(decoded);
  var user = decoded['eid'];
  var rol = decoded['rol'];
  alert(user+rol);
if(user=="abdul" && rol=="admin"){
  this.router.navigate(['/dashboard']);
}
  
}
  Checklogin(loginData:any){
    debugger
    let payLoad = new HttpParams();
    payLoad = payLoad.append("UserID",loginData.uemail);
    payLoad = payLoad.append("Password",loginData.upwd);
    return this._http.post(this.baseUrl+"login",payLoad);
  }

  public isLoggedIn(){
    return localStorage.getItem('access_token') !== null;

  }

  public logout(){
    localStorage.removeItem('access_token');
  }

  editMemForUpdate(){
    alert("ok");
  }
}
