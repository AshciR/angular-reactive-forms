import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private formBuilder: FormBuilder) { }

  registrationForm = this.formBuilder.group({
    userName: ['Richie'],
    password: [''],
    confirmPassword: [''],
    address: this.formBuilder.group({
      city: [''],
      state: [''],
      postalCode: ['']
    })
  })

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
