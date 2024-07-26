import {Component, } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  errorMessageServe: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private _snackBar: MatSnackBar) {}

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
        this._snackBar.open("Usuario registrado correctamente", "Cerrar", {
          duration: 5000
        });
      },
      error: err => {
        this.errorMessageServe = err.error.message;
        this._snackBar.open(this.errorMessageServe, "Cerrar", {
          duration: 5000
        });
      }
    });
  }
}
