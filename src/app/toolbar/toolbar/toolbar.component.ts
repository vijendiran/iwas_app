import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(public _lang:LanguageService ) { 
    this.ngAfterViewInit();
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(){

  }
  selectChangeHandler(nav:any){
    this._lang.selectChangeHandler(nav);
  }
  // darkmode(){
  //   debugger;
  //   this._dark.darkmode();
  // }
}
