import { Component, OnInit } from '@angular/core';
import { LogoutService } from 'src/app/services/logout/logout.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  constructor(public _lang:LanguageService,public _logOut:LogoutService) { }

  ngOnInit(): void {
  }

  logOut(){
     this._logOut.logOut();
   }
   selectChangeHandler(event:any){
    this._lang.selectChangeHandler(event);
  }
  subsMenu(event:any){
    let sidebar = document.querySelector(".thirdlvl");
    sidebar.classList.toggle("d-none");

  }
  pageRefresh(){
    location.reload();
  }

// following are the code to change sidebar button(optional)
menuBtnChange() {
  debugger;
let sidebar = document.querySelector(".sidebar");
let mainMenu = document.querySelector(".mainNav");
let closeBtn = document.querySelector("#btn");
let mainContent = document.querySelector(".Main_content");
let cm= document.querySelector(".cm-fluid");
if(sidebar.classList.contains("open")){
  // mainMenu.classList.add("push-bar");
//  cm.classList.replace("container-fluid","container");
  mainContent.classList.add("main-txt");
 closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the iocns class
}else {
  // mainMenu.classList.remove("push-bar");
  // cm.classList.replace("container","container-fluid");
  mainContent.classList.remove("main-txt");
 closeBtn.classList.replace("bx-menu-alt-right","bx-menu");//replacing the iocns class
 mainContent.classList.add("remove-margin");
}
}
CloseMenuClick(){
  let mainMenu = document.querySelector(".mainNav");
  let sidebar = document.querySelector(".sidebar");
  sidebar.classList.toggle("open");
  this.menuBtnChange();//calling the function(optional)
  // mainMenu.classList.remove("push-bar");
}

}
