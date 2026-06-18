import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductService } from '../../services/product.service';

import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector:'app-product',
  standalone:true,
  imports:[
    CommonModule,
    FormsModule
  ],
  templateUrl:'./product.component.html'
})
export class ProductComponent {


products:Product[]=[];



constructor(
 private productService:ProductService
){}



ngOnInit(){

 this.loadProducts();

}




loadProducts(){

 this.productService
 .getProducts()
 .subscribe({

   next:(data)=>{

    this.products=data;

   },


   error:(error)=>{

    console.log(error);

   }

 });

}

changeStatus(product:Product){


if(product.active){


 this.productService
 .deactivateProduct(product.id)
 .subscribe(()=>{

    product.active=false;

 });


}else{


 this.productService
 .activateProduct(product.id)
 .subscribe(()=>{

    product.active=true;

 });


}


}


}