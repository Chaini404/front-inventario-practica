import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './user.component.html'
})
export class User {

  users = [
    {
      id: 1,
      username: 'admin',
      role: 'ADMIN',
      active: true
    },
    {
      id: 2,
      username: 'juan',
      role: 'EMPLOYEE',
      active: false
    }
  ];

  modalOpen = false;

  selectedUser: any = null;

  openModal(user: any) {

    this.selectedUser = { ...user };

    this.modalOpen = true;

  }

  closeModal() {

    this.modalOpen = false;

  }

}