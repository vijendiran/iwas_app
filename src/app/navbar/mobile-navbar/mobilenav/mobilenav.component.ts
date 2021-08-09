import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutService } from 'src/app/services/logout/logout.service';
@Component({
  selector: 'app-mobilenav',
  templateUrl: './mobilenav.component.html',
  styleUrls: ['./mobilenav.component.css']
})
export class MobilenavComponent implements OnInit {

  constructor(private logouts:LogoutService) { }

  ngOnInit(): void {
  }
  logout(){
   this.logouts.logOut();
  }
}
