import { Injectable } from '@angular/core';
import {FormControl, Validators,FormGroup,FormArray, FormBuilder} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  value:any;
  lang:any;
  seten:any;
  constructor( private formBuilder: FormBuilder,public translate:TranslateService) { 
    translate.addLangs(['en','ta']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    
    translate.use(browserLang.match(/en|ta/)? browserLang:'en');
  }
  ngOnInit(){
    this.seten = localStorage.getItem("language");
    if(this.seten=="ta"){
     this.translate.use('ta');
    }
    else if(this.seten=="en"){
     this.translate.use('en');
    }
  }
  selectedLang: string = '';
  //event handler for the select element's change event
  selectChangeHandler (event: any) 
  {
    debugger;
      this.selectedLang = event.target.value;
      if(this.selectedLang=="ta"){
        this.translate.use('ta');
        localStorage.setItem("language","ta");
      }
      else if(this.selectedLang=="en"){
        this.translate.use('en');
        localStorage.setItem("language","en");
      }
    }
}
