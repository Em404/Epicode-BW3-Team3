import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProducts } from '../../pages/home/models/i-products';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject = new BehaviorSubject<IProducts[]>([]);
  cart$ = this.cartSubject.asObservable();
  cart: IProducts[] = [];

  index!:number

  constructor() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
      this.nextProd();
    }
  }

  addToCart(product: IProducts):void {
    const prodAdd = this.cart.find(p => p.id === product.id);

    if (prodAdd) {
      prodAdd.quantita += 1;
      prodAdd.totalPrice = prodAdd.quantita * prodAdd.prezzo;
    } else {
      const newProduct: IProducts = {
        ...product,
        quantita: 1,
        totalPrice: product.prezzo,
      };
      this.cart.unshift(newProduct);
    }

    this.saveCartToLocalStorage();
    this.nextProd();
  }

  removeOneProduct(prod:IProducts):void{

      const prodToUpdate = this.cart.find((p) => p.id === prod.id);

      if (prodToUpdate) {
        prodToUpdate.quantita -= 1;
        if (prodToUpdate.quantita === 0) {
          this.removeFromCart(prodToUpdate.id);
        } else {
          prodToUpdate.totalPrice = prodToUpdate.quantita * prodToUpdate.prezzo;
          this.saveCartToLocalStorage();
          this.nextProd();
        }
      }

  }

  removeFromCart(id:number):void{

     this.index = this.cart.findIndex(p => p.id === id)
    if (this.index !== -1) {
      this.cart.splice(this.index, 1);
    }

    this.saveCartToLocalStorage()
    this.nextProd()
  }


   saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

   nextProd() {
    this.cartSubject.next(this.cart);
  }
}
