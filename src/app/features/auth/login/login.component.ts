import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html'
})
export class Login {

  loginForm: FormGroup;

  error: string = '';
  successMessage: string = '';
  loading: boolean = false;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  }


  iniciarSesion() {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }


    this.loading = true;
    this.error = '';
    this.successMessage = '';

    this.cdr.detectChanges();


    const credentials = this.loginForm.value;

    console.log('Enviando login:', credentials);


    this.authService.login(credentials).subscribe({

      next: (response: { token: string }) => {

        console.log('Login exitoso:', response);


        localStorage.setItem('token', response.token);

        this.successMessage = '¡Bienvenido! Redirigiendo...';
        this.loading = false;

        this.cdr.detectChanges();


        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1500);


      },


      error: (err) => {

        console.error('Error en login:', err);


        if (err.status === 401 || err.status === 403) {

          this.error = 'Usuario o contraseña incorrectos. Por favor, intenta nuevamente.';

        } else if (err.status === 404) {

          this.error = 'Usuario no encontrado. Verifica tus datos.';

        } else if (err.status === 0) {

          this.error = 'Error de conexión. Verifica que el servidor esté corriendo.';

        } else {

          this.error = 'Error al iniciar sesión. Intenta nuevamente.';

        }


        this.loading = false;
        this.cdr.detectChanges();

      }

    });

  }

}