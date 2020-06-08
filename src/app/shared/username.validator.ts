import { AbstractControl, ValidatorFn } from "@angular/forms";

export function forbiddenNameValidator(forbiddenName: RegExp): ValidatorFn {
    return (formControl: AbstractControl): { [key: string]: any } | null => {
        const forbidden = forbiddenName.test(formControl.value);
        return forbidden ? { 'forbiddenName': { value: formControl.value } } : null;
    }
}