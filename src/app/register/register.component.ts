import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {

  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {}


  formularioRegistro = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  submit() {
    console.log(this.formularioRegistro.value!);

    this.authService.register(
      this.formularioRegistro.value.nombre!,
      this.formularioRegistro.value.email!,
      this.formularioRegistro.value.password!
    ).subscribe({
      next: data => {
        console.log(data);
      },
      error: err => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
      }
    })
  }

}
