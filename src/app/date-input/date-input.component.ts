import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-date-input',
  template: `<div [formGroup]="dateInputGroup" class="form-group row" [ngClass]="control.valid ? 'has-success' : 'has-danger'">
    <label for="{{name}}" class="col-12"><small *ngIf="isRequired">*</small>{{label}}:</label>
    <input type="hidden" [formControl]="control">
    <div class="form-group col-4">
      <select class="form-control" formControlName="day" (change)="setValue()">
        <ng-container *ngFor="let d of days">
          <option [ngValue]="d">{{d}}</option>
        </ng-container>
      </select>
    </div>
    <div class="form-group col-4">
      <select class="form-control" formControlName="month" (change)="setValue()">
        <ng-container *ngFor="let m of months; let i=index">
          <option [ngValue]="i+1">{{m}}</option>
        </ng-container>
      </select>
    </div>
    <div class="form-group col-4">
      <select class="form-control" formControlName="year" (change)="setValue()">
        <ng-container *ngFor="let y of years">
          <option [ngValue]="y">{{y}}</option>
        </ng-container>
      </select>
    </div>
    <div class="col-12">
      <app-validation-messages [errors]="control.errors"></app-validation-messages>
    </div>
  </div>`
})
export class DateInputComponent implements OnInit {
  dateInputGroup : FormGroup;
  @Input() control: AbstractControl;
  @Input() label: string;
  @Input('formControlName') name: string;

  days = [];
  months = moment.months();
  years = [];
  isRequired = false;

  constructor(private fb: FormBuilder) { 
    this.dateInputGroup = this.fb.group({
      day: '',
      month: '',
      year: ''
    });
  }

  ngOnInit() {
    const validators = this.control.validator(this.control);
    for (let k in validators) {
      console.log(k);
      switch (k) {
        case 'required': this.isRequired = true; break;
        default: this.isRequired = false;
      }
    }
    this._initDays();
    this._initYears();
    (<FormControl>this.control).registerOnChange(() => {
      console.log('on change', this.control.value);
      if (this.control.value) {
        const d = moment(this.control.value,'YYYY-MM-DD');
        if (d.isValid()) {
          this.dateInputGroup.reset({
            day: d.date(),
            month: d.month()+1,
            year: d.year()
          });
        }
      } else {
        this.dateInputGroup.reset({
          day: '',
          month: '',
          year: ''
        });
      }
    });
    
  }

  setValue() {
    if (this.dateInputGroup.value.year && this.dateInputGroup.value.month && this.dateInputGroup.value.day) {
      this.control.reset(
        moment(this.dateInputGroup.value.year+'-'
          +this.dateInputGroup.value.month+'-'
          +this.dateInputGroup.value.day, 'YYYY-MM-DD').format('YYYY-MM-DD'));
    } else {
      this.control.reset('YYYY-MM-DD');
    }
  }

  private _initDays() {
    for (let i = 1; i < 32; i++) {
      this.days.push(i);
    }
  }
  private _initYears() {
    for (let i = 2010; i < 2020; i++) {
      this.years.push(i);
    }
  }

}
