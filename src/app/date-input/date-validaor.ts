import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, Validators, ValidatorFn } from '@angular/forms';

import * as moment from 'moment';

export const dateISO: ValidatorFn = (control: AbstractControl): {[key: string]: boolean} => {
  if (!isPresent(control.value)) return null;
  if (!isDate(control.value)) return {dateISO: true};
  if (moment(control.value,'YYYY-MM-DD').isValid()) return null;
  return {dateISO: true};
};

export function isPresent(obj: any): boolean {
  return obj !== undefined && obj !== null;
}

export function isDate(obj: any): boolean {
  return !/Invalid|NaN/.test(new Date(obj).toString());
}

const DATE_ISO_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MyDateISOValidator),
  multi: true
};

@Directive({
  selector: '[mydateISO][formControlName],[mydateISO][formControl],[mydateISO][ngModel]',
  providers: [DATE_ISO_VALIDATOR]
})

export class MyDateISOValidator implements Validator {
  validate(c: AbstractControl): {[key: string]: any} {
    return dateISO(c);
  }
}