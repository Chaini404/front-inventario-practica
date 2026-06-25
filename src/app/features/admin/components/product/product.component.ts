import { Component, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './product.component.html'
})
export class ProductComponent {


  products: Product[] = [];
  searchTerm: string = '';
  modalOpen = false;
  modalCreateOpen = false;
  error: string = '';
  loading: boolean = true;
  successMessage: string = '';
  editSuccessMessage: string = '';
  statusMessage: string = '';
  statusMessageType: string = '';  // 'success', 'warning', 'error'

  selectedProduct: any = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    stock: 0,
    active: true
  };

  newProduct: any = {
    name: '',
    description: '',
    price: null,
    stock: null,
    active: true
  };


  get filteredProducts(): Product[] {
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      return this.products;
    }
    const term = this.searchTerm.toLowerCase().trim();
    return this.products.filter(product => 
      product.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term) ||
      product.id.toString().includes(term)
    );
  }


  constructor(
    private productService: ProductService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}


  ngOnInit() {
    this.loadProducts();
  }


  loadProducts() {
    this.loading = true;
    this.error = '';

    this.productService.getProducts().subscribe({
      next: (data) => {
        console.log(' Productos cargados:', data);
        this.products = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error(' Error al cargar productos:', error);
        this.error = 'Error al cargar productos';
        this.loading = false;
        this.cdr.detectChanges();
        if (error.status === 403 || error.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    });
  }

 
  openCreateModal() {
    this.newProduct = {
      name: '',
      description: '',
      price: null,
      stock: null,
      active: true
    };
    this.error = '';
    this.successMessage = '';
    this.loading = false;
    this.modalCreateOpen = true;
    this.cdr.detectChanges();
  }

  closeCreateModal() {
    this.modalCreateOpen = false;
    this.successMessage = '';
    this.error = '';
    this.loading = false;
    this.cdr.detectChanges();
  }

  createProduct() {
    if (!this.newProduct.name || !this.newProduct.description || this.newProduct.price <= 0 || this.newProduct.stock < 0) {
      this.error = 'Por favor, completa todos los campos correctamente.';
      this.cdr.detectChanges();
      return;
    }

    this.loading = true;
    this.error = '';
    this.successMessage = '';
    this.cdr.detectChanges();

    this.productService.createProduct(this.newProduct).subscribe({
      next: (product) => {
        console.log(' Producto creado:', product);
        this.ngZone.run(() => {
          this.successMessage = ' ¡Producto creado exitosamente!';
          this.loading = false;
          this.cdr.detectChanges();
          this.loadProducts();
        });
      },
      error: (error) => {
        console.error(' Error al crear producto:', error);
        this.ngZone.run(() => {
          this.error = ' Error al crear el producto. Intenta nuevamente.';
          this.loading = false;
          this.cdr.detectChanges();
        });
      }
    });
  }


  openModal(product: any) {
    this.selectedProduct = { ...product };
    this.error = '';
    this.editSuccessMessage = '';
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
    this.error = '';
    this.editSuccessMessage = '';
    this.loading = false;
    this.cdr.detectChanges();
  }

  updateProduct() {
    if (!this.selectedProduct.name || !this.selectedProduct.description || this.selectedProduct.price <= 0 || this.selectedProduct.stock < 0) {
      this.error = 'Por favor, completa todos los campos correctamente.';
      this.cdr.detectChanges();
      return;
    }

    this.loading = true;
    this.error = '';
    this.editSuccessMessage = '';
    this.cdr.detectChanges();

    this.productService.updateProduct(this.selectedProduct.id, this.selectedProduct).subscribe({
      next: (product) => {
        console.log(' Producto actualizado:', product);
        this.ngZone.run(() => {
          this.editSuccessMessage = ' ¡Producto actualizado exitosamente!';
          this.loading = false;
          this.cdr.detectChanges();
          this.loadProducts();
          
          setTimeout(() => {
            this.closeModal();
            this.editSuccessMessage = '';
            this.cdr.detectChanges();
          }, 2000);
        });
      },
      error: (error) => {
        console.error(' Error al actualizar producto:', error);
        this.ngZone.run(() => {
          this.error = 'Error al actualizar el producto';
          this.loading = false;
          this.cdr.detectChanges();
        });
      }
    });
  }


  changeStatus(product: Product) {
    console.log(' Cambiando estado de producto:', product.id, 'Estado actual:', product.active);
    
    this.statusMessage = '';
    this.statusMessageType = '';
    this.cdr.detectChanges();
    
    if (product.active) {
      this.productService.deactivateProduct(product.id).subscribe({
        next: () => {
          product.active = false;
          this.cdr.detectChanges();
          console.log(' Producto desactivado:', product.id);
          
          this.ngZone.run(() => {
            this.statusMessage = ' Producto desactivado correctamente';
            this.statusMessageType = 'warning';
            this.cdr.detectChanges();
            
            setTimeout(() => {
              this.statusMessage = '';
              this.statusMessageType = '';
              this.cdr.detectChanges();
            }, 3000);
          });
        },
        error: (error) => {
          console.error(' Error al desactivar:', error);
          product.active = true;
          this.cdr.detectChanges();
          
          this.ngZone.run(() => {
            this.statusMessage = ' Error al desactivar el producto';
            this.statusMessageType = 'error';
            this.cdr.detectChanges();
            
            setTimeout(() => {
              this.statusMessage = '';
              this.statusMessageType = '';
              this.cdr.detectChanges();
            }, 3000);
          });
        }
      });
    } else {
      this.productService.activateProduct(product.id).subscribe({
        next: () => {
          product.active = true;
          this.cdr.detectChanges();
          console.log(' Producto activado:', product.id);
          
          this.ngZone.run(() => {
            this.statusMessage = ' Producto activado correctamente';
            this.statusMessageType = 'success';
            this.cdr.detectChanges();
            
            setTimeout(() => {
              this.statusMessage = '';
              this.statusMessageType = '';
              this.cdr.detectChanges();
            }, 3000);
          });
        },
        error: (error) => {
          console.error(' Error al activar:', error);
          product.active = false;
          this.cdr.detectChanges();
          
          this.ngZone.run(() => {
            this.statusMessage = ' Error al activar el producto';
            this.statusMessageType = 'error';
            this.cdr.detectChanges();
            
            setTimeout(() => {
              this.statusMessage = '';
              this.statusMessageType = '';
              this.cdr.detectChanges();
            }, 3000);
          });
        }
      });
    }
  }

 searchProducts() {

  if (!this.searchTerm.trim()) {
    this.loadProducts();
    return;
  }

  this.productService.searchProducts(this.searchTerm)
    .subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
}
}