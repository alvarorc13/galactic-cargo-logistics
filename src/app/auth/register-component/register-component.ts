import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-component',
  imports: [ReactiveFormsModule],
  templateUrl: './register-component.html',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  registerForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  isNotValidField(field: string) {
    return this.registerForm.controls[field].invalid && this.registerForm.controls[field].touched;
  }

  getFieldErrors(field: string) {
    const control = this.registerForm.controls[field];
    if (!control) return null;
    const errors = control.errors || {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'El campo no puede estar vacio';
        case 'email':
          return 'Formato de email invalido';
        case 'minlength':
          return `El campo debe tener como minimo ${errors['minlength'].requiredLength} caracteres`;
        default:
          null;
      }
    }
    return null;
  }

  register() {
    if (this.registerForm.valid) {
      this.authService
        .register(
          this.registerForm.value.email,
          this.registerForm.value.name,
          this.registerForm.value.password,
        )
        .subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Registro exitoso',
              text: 'Te has registrado correctamente. Ya puedes iniciar sesion',
            });
            this.router.navigate(['/auth/login']);
          },
          error: () =>
            Swal.fire({
              icon: 'error',
              title: 'Registro fallido',
              text: 'Error durante el registro. Vuelve a intentarlo maquina',
            }),
        });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Registro fallido',
        text: 'Campos incorrectos',
      });
    }
  }
}
