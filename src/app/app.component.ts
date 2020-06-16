import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { forbiddenNameValidator } from './shared/username.validator';
import { passwordValidator } from './shared/password.validator';
import { RegistrationService } from './registration.service';
import { error } from 'console';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  registrationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      userName: ['Richie', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/admin/)]],
      email: [''],
      subscribe: [false],
      password: [''],
      confirmPassword: [''],
      address: this.formBuilder.group({
        city: [''],
        state: [''],
        postalCode: ['']
      }),
      alternateEmails: this.formBuilder.array([])
    }, { validator: passwordValidator })

    this.registrationForm.get('subscribe').valueChanges.subscribe(checkedValue => {
      const email = this.registrationForm.get('email');

      if (checkedValue) {
        email.setValidators(Validators.required);
      } else {
        email.clearValidators();
      }

      email.updateValueAndValidity();
    })

  }

  get userName() {
    return this.registrationForm.get('userName');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get alternateEmails() {
    return this.registrationForm.get('alternateEmails') as FormArray;
  }

  addAlternateEmail() {
    this.alternateEmails.push(this.formBuilder.control(''));
  }

  public loadAllApiData() {
    // If you use the setValue function, 
    // you HAVE to pass ALL the FormGroups and FormControl values
    this.registrationForm.setValue({
      userName: 'Sasha',
      email: 'richie@gmail.com',
      password: 'baby',
      confirmPassword: 'baby',
      subscribe: false,
      address: {
        city: 'Kingston',
        state: 'NC',
        postalCode: '12345'
      },
      alternateEmails: []
    })
  }

  public loadSomeApiData() {
    // Use the patchValue function, 
    // if you want to only set some of the values
    this.registrationForm.patchValue({
      userName: 'Ashcir',
      password: 'bar',
      confirmPassword: 'bar'
    })
  }

  public onSubmit() {
    console.log(this.registrationForm.value);
    this.registrationService
      .register(this.registrationForm.value)
      .subscribe(
        response => console.log('Success'),
        error => console.error('Error')
      );
  }

}
