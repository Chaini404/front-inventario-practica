import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
private cdr = inject(ChangeDetectorRef);
  private authService = inject(AuthService);

  users: User[] = [];

  modalOpen = false;

  selectedUser: User | null = null;


  ngOnInit(): void {
      console.log("ENTRO USER COMPONENT");

    this.loadUsers();
  }


 loadUsers(): void {

  this.authService.getUsers().subscribe({

    next: (data) => {

      console.log("DATA:", data);

      this.users = data;

      this.cdr.detectChanges();

    },

    error: (error) => {
      console.error('Error cargando usuarios', error);
    }

  });

}

  openModal(user: User): void {

    this.selectedUser = { ...user };

    this.modalOpen = true;

  }


  closeModal(): void {

    this.modalOpen = false;

    this.selectedUser = null;

  }

}