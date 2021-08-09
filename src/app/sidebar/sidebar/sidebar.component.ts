import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { Router } from '@angular/router';
import { LogoutService } from 'src/app/services/logout/logout.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  opened=true;
  constructor(public _lang:LanguageService,  public router:Router, public _logOut:LogoutService ){}
  expandedIndex = 0;

    refresh(){
     location.reload();
    }
    ngOnInit(){

      if (screen && screen.width < 786) {
        var sidebar = document.querySelector(".sidebar");
        sidebar.classList.remove("open");
        }
    }
    ngAfterViewInit(){

    }
    CloseMenuClick(){
      let sidebar = document.querySelector(".sidebar");
      sidebar.classList.toggle("open");
      this.menuBtnChange();//calling the function(optional)
    }
    selectChangeHandler(event:any){
      this._lang.selectChangeHandler(event);
    }
    subsMenu(event:any){
      let sidebar = document.querySelector(".thirdlvl");
      sidebar.classList.toggle("d-none");

    }
    subsMenus(event:any){
      let sidebar = document.querySelector(".thirdlvls");
      sidebar.classList.toggle("d-none");

    }


// following are the code to change sidebar button(optional)
 menuBtnChange() {
   debugger;
  let sidebar = document.querySelector(".sidebar");
  
let closeBtn = document.querySelector("#btn");
 if(sidebar.classList.contains("open")){
   closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the iocns class
 }else {
   closeBtn.classList.replace("bx-menu-alt-right","bx-menu");//replacing the iocns class
 }
}

logOut(){
   this._logOut.logOut();
 }

}
