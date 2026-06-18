import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Product } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private http = inject(HttpClient);


  private apiUrl = 'http://localhost:8080/api/products';



  // Obtener todos los productos activos

  getProducts(): Observable<Product[]> {

    return this.http.get<Product[]>(this.apiUrl);

  }



  // Obtener producto por ID

  getProductById(id:number): Observable<Product>{

    return this.http.get<Product>(
      `${this.apiUrl}/${id}`
    );

  }



  // Crear producto

  createProduct(product:Product):Observable<Product>{

    return this.http.post<Product>(
      this.apiUrl,
      product
    );

  }



  // Actualizar producto

  updateProduct(
    id:number,
    product:Product
  ):Observable<Product>{

    return this.http.put<Product>(
      `${this.apiUrl}/${id}`,
      product
    );

  }



  // Desactivar producto

  deactivateProduct(id:number):Observable<void>{

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );

  }



  // Activar producto

  activateProduct(id:number):Observable<Product>{

    return this.http.patch<Product>(
      `${this.apiUrl}/${id}/activate`,
      {}
    );

  }


}