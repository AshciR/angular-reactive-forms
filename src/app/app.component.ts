import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { forbiddenNameValidator } from './shared/username.validator';
import { passwordValidator } from './shared/password.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

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
      })
    },
      { validator: passwordValidator }
    )

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

  public loadAllApiData() {
    // If you use the setValue function, 
    // you HAVE to pass ALL the FormGroups and FormControl values
    this.registrationForm.setValue({
      userName: 'Sasha',
      password: 'baby',
      confirmPassword: 'baby',

      address: {
        city: 'Kingston',
        state: 'NC',
        postalCode: '12345'
      }
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

}
