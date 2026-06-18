import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './product.component.html'
})
export class Product {

  products = [
    {
      id: 1,
      name: 'Laptop HP',
      description: 'Core i5 16GB RAM',
      price: 2500,
      stock: 10,
      createdAt: '18/06/2026',
      active: true
    },
    {
      id: 2,
      name: 'Mouse Logitech',
      description: 'Inalámbrico',
      price: 80,
      stock: 50,
      createdAt: '18/06/2026',
      active: false
    }
  ];

  modalOpen = false;

  selectedProduct: any = null;

  openModal(product: any) {
    this.selectedProduct = { ...product };
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

}