import {Component, } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  errorMessageServe: string = '';
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private _snackBar: MatSnackBar, private route: Router) {}

  formularioRegistro = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  onSubmit(): void {
    this.isLoading = true;
    this.authService.register(
      this.formularioRegistro.value.nombre!,
      this.formularioRegistro.value.email!,
      this.formularioRegistro.value.password!
    ).subscribe({
      next: data => {
        this.isLoading = false;
        this._snackBar.open("Usuario registrado correctamente", "Cerrar", {
          duration: 5000
        });
        this.route.navigate(['/']);
      },
      error: err => {
        this.isLoading = false;
        this.errorMessageServe = err.error.message;
        this._snackBar.open(this.errorMessageServe, "Cerrar", {
          duration: 5000
        });
      }
    });
  }
}
