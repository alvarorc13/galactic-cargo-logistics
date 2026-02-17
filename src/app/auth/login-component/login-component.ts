import { Component, inject, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-component',
  imports: [FormsModule, RouterLink],
  templateUrl: './login-component.html',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  @ViewChild('loginForm') loginForm!: NgForm;

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
        next: () => {
          Swal.fire({ icon: 'success', title: 'Credenciales correctas', text: 'Bienvenido!' });
          this.router.navigate(['']);
        },
        error: () =>
          Swal.fire({
            icon: 'error',
            title: 'Credenciales incorrectas',
            text: 'Intenta loguearte de nuevo',
          }),
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Credenciales incompletas',
        text: 'Debes rellenar todos los campos',
      });
    }
  }
}
