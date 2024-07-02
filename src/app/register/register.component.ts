import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {merge} from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {

  errorMessageServe = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  formularioRegistro = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
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
        this.errorMessageServe = err.error.message;
        console.log(this.errorMessageServe);
      }
    })
  }

}
