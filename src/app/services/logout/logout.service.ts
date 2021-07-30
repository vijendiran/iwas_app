import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(public router:Router) { }
  logOut(){
    document.querySelectorAll(".inverted").forEach((result) => {
      result.classList.remove("invert");
      });
    localStorage.removeItem("user");
    localStorage.removeItem("theme");
    localStorage.removeItem("language");
    this.router.navigate(['**'])
   localStorage.removeItem('access_token');
  localStorage.removeItem('eid');
  }
}
