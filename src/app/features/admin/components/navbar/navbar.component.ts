import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth/services/auth.service';


@Component({
  selector: 'app-navbar',
  standalone: true,

  imports: [CommonModule],

  templateUrl: './navbar.component.html'
})
export class Navbar {

  username: string | null = null;

  // Variable para mostrar u ocultar el menú
  mostrarMenu: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.username = this.authService.getUsername();
  }

  cerrarSesion() {
    this.authService.logout(); // si tienes este método
  }

}