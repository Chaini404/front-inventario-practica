import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html'
})
export class Register {

  registerForm: FormGroup;
  mensaje: string = '';
  error: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],  
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmarPassword: ['', Validators.required]
    });
  }

  registrar() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const formValue = this.registerForm.value;

    if (formValue.password !== formValue.confirmarPassword) {
      this.error = 'Las contraseñas no coinciden';
      return;
    }

    this.loading = true;
    this.error = '';
    this.mensaje = '';

    const user = {
      username: formValue.nombre + formValue.apellido,
      email: formValue.email, 
      password: formValue.password,
      role: 'USER'
    };

    console.log('Enviando registro:', user);

    this.authService.register(user).subscribe({
      next: (response: string) => {
        console.log('Registro exitoso:', response);
        this.mensaje = ' ¡Registro exitoso! Redirigiendo al login...';
        this.loading = false;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err: any) => {
        console.error('Error:', err);
        this.error = err.error || '❌ Error al registrar usuario';
        this.loading = false;
      }
    });
  }
}