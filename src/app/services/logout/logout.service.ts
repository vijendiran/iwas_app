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
  localStorage.clear();
  this.router.navigate(['**']);
  }
}
