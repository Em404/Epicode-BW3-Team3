import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeaderService } from '../header/header.service';
import { CartService } from './cart.service';
import { IProducts } from '../../pages/home/models/i-products';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  showCart!:boolean;
  showCartSubscription!:Subscription;
  cart:IProducts[]= []
  result: number[] = [];
  totalProducts: number = 0;
  totalPrice: number = 0;

  constructor(
    private headerService:HeaderService,
    private cartService:CartService,
    private router:Router
    ){}

  ngOnInit(){
    this.cartService.cart$.subscribe((data)=> {
      this.cart = data
      this.showCart = data.length > 0

    })
    this.showCartSubscription = this.headerService.showCart$.subscribe(data => {
      this.showCart = data;
    })
    this.calculateTotal()

  }


  add(prod:IProducts){
this.cartService.addToCart(prod)
this.calculateTotal()
  }
  cestina(prod:IProducts){
    this.cartService.removeOneProduct(prod)
    this.calculateTotal
  }

  remove(id:number ){
  this.cartService.removeFromCart(id)
  }



  ngOnDestroy(){
    this.showCartSubscription.unsubscribe();
  }

  toggleShowCart():void{
    this.headerService.toggleShowCart(this.showCart);
  }
  calculateTotal() {
    this.totalProducts = this.cart.reduce((total, prod) => total + prod.quantita, 0);
    this.totalPrice = this.cart.reduce((total, prod) => total + prod.totalPrice, 0);
  }
}
