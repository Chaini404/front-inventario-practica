import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-audit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audit.component.html'
})
export class Audit {

  audits = [
    {
      id: 1,
      username: 'admin',
      action: 'CREAR',
      productId: 1,
      createdAt: '18/06/2026 10:00'
    },
    {
      id: 2,
      username: 'juan',
      action: 'EDITAR',
      productId: 2,
      createdAt: '18/06/2026 11:00'
    }
  ];

}