import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  isLoggedIn: boolean = false;
  errorMessage: string = '';
  roles: string[] = [];
  isLoading: boolean = false;

  constructor(private authService: AuthService, private storageService: StorageService, private fb :FormBuilder,private _snackBar: MatSnackBar, private route: Router) {}

  formularioLogin = this.fb.group({
    nombre: ['', Validators.required],
    password: ['', Validators.required]
  })

  ngOnInit(): void {
    if(this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }

  onSubmit() :void {
    this.isLoading = true;
    this.authService.login(
      this.formularioLogin.value.nombre!,
      this.formularioLogin.value.password!
    ).subscribe({
      next: data => {
        this.isLoading = false;
        this.storageService.saveUser(data);
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        this._snackBar.open("Sesión iniciada con rol/es "+ this.roles, "Cerrar");
        window.location.reload();
      },
      error: err => {
        this.isLoading = false;
        this.errorMessage = err.error.message;
        this._snackBar.open(this.errorMessage, "Cerrar", {
          duration: 5000
        });
      }
    })
    this.route.navigate(['/']);
  }
}
