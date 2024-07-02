import {Component, } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  isSuccessful: boolean = false;
  isSignUpFailed: boolean = false;
  errorMessageServe: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  formularioRegistro = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  onSubmit(): void {
    this.authService.register(
      this.formularioRegistro.value.nombre!,
      this.formularioRegistro.value.email!,
      this.formularioRegistro.value.password!
    ).subscribe({
      next: data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessageServe = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}
