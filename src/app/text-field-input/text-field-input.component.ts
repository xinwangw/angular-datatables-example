import { Component, OnInit, Input } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-text-field-input',
  template: `<div class="form-group row" [ngClass]="control.valid ? 'has-success' : 'has-danger'">
    <label for="{{name}}" class="col-12"><small *ngIf="isRequired">*</small>{{label}}:</label>
    <div class="col-12">
    <input type="text" id="{{name}}" class="form-control col-3" [formControl]="control">
    </div>
    <app-validation-messages class="col-12" [errors]="control.errors"></app-validation-messages>
    </div>`
})
export class TextFieldInputComponent implements OnInit {
  @Input() control: AbstractControl;
  @Input() label: string;
  @Input('formControlName') name: string;
  isRequired = false;

  constructor() { }

  ngOnInit() {
    const validators = this.control.validator(this.control);
    for (let k in validators) {
      console.log(k);
      switch (k) {
        case 'required': this.isRequired = true; break;
        default: this.isRequired = false;
      }
    }
  }

}
