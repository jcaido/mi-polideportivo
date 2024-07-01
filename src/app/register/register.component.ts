import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {

  constructor(private fb: FormBuilder) {}

  formularioRegistro = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  submit() {

  }

}
