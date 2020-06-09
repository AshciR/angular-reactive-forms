import { AbstractControl } from "@angular/forms";

// N.B. formControl doesn't refer to a singluar form control, 
// it actually refers to the form group, this allows it to 
// have access to all of the form controls in the form group 
export function passwordValidator(formControl: AbstractControl): { [key: string]: boolean } | null {

    const password = formControl.get('password');
    const confirmPassword = formControl.get('confirmPassword');

    // We don't want the error to trigger if the user hasn't touched both fields yet
    if(password.pristine || confirmPassword.pristine){
        return null
    }

    return password &&
        confirmPassword &&
        password.value != confirmPassword.value ? { 'passwordMismatch': true } : null
}