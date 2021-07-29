import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css']
})
export class ToggleComponent implements OnInit {
  @Output() change: EventEmitter<MatSlideToggleModule>;
  @Input() checked: boolean;

  isChecked = true;
  formGroup: FormGroup;
  filteringSchedule: boolean;
  toggle: boolean;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.filteringSchedule = JSON.parse(localStorage.getItem('toggleButtonState'));
    let body = document.getElementById("dark");
    if(this.filteringSchedule==true){
      body.classList.add("dark");
      localStorage.setItem("theme","dark"); 
      document.querySelectorAll(".inverted").forEach((result) => {
       result.classList.add("invert");
       });
    }
    this.formGroup = this.formBuilder.group({
      enableDark: this.filteringSchedule
    });
  }

  onFormSubmit(formValue: any) {
    alert(JSON.stringify(formValue, null, 2));
  }

  onChange(ob: MatSlideToggleModule) {
    let body = document.getElementById("dark");
    this.filteringSchedule = !this.filteringSchedule;
    localStorage.setItem('toggleButtonState', JSON.stringify(this.filteringSchedule));
    let cdark=localStorage.getItem('toggleButtonState');
    if(cdark=="true"){
      body.classList.add("dark");
         localStorage.setItem("theme","dark"); 
         document.querySelectorAll(".inverted").forEach((result) => {
          result.classList.add("invert");
          });
    }
    else{
      body.classList.remove("dark");
      localStorage.removeItem("theme"); 
      document.querySelectorAll(".inverted").forEach((result) => {
        result.classList.remove("invert");
        });
    }

  }
}
