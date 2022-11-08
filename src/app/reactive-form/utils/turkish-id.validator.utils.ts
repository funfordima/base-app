/* eslint-disable @typescript-eslint/naming-convention */
import type { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const turkishIDValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const turkishIDLength = 11;
    const currentLength = value.length;

    if (currentLength !== turkishIDLength) {
      return { 'valid-id': true };
    }

    let totalX = 0;
    let totalY1 = 0;
    let totalY2 = 0;

    //first rule
    for (let i = 0; i < turkishIDLength - 1; i++) {
      totalX += Number(value.substr(i, 1));
    }
    const isRuleX = totalX % 10 == value.substr(10, 1);

    //second rule
    for (let i = 0; i < turkishIDLength - 1; i += 2) {
      totalY1 += Number(value.substr(i, 1));
    }
    for (let i = 1; i < turkishIDLength - 1; i += 2) {
      totalY2 += Number(value.substr(i, 1));
    }
    const isRuleY = (totalY1 * 7 - totalY2) % 10 == value.substr(9, 0);

    return isRuleX && isRuleY ? null : { 'valid-id': true };
  };
};
