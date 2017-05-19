import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, Validators, ValidatorFn } from '@angular/forms';

import * as moment from 'moment';
import { isPresent, isDate } from './date-validaor';

export const requiredDate: ValidatorFn = (control: AbstractControl): {[key: string]: boolean} => {
  if (!isPresent(control.value)) return {required: true};
  if (!isDate(control.value)) return {required: true};
  if (!moment(control.value,'YYYY-MM-DD').isValid()) return {required: true};
  return null;
};

const REQUIRED_DATE_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => RequiredDateValidator),
  multi: true
};

@Directive({
  selector: '[requiredDate][formControlName],[requiredDate][formControl],[requiredDate][ngModel]',
  providers: [REQUIRED_DATE_VALIDATOR]
})

export class RequiredDateValidator implements Validator {
  validate(c: AbstractControl): {[key: string]: any} {
    return requiredDate(c);
  }
}