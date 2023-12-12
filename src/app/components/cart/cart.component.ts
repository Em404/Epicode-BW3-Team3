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

  }


  add(prod:IProducts){
this.cartService.addToCart(prod)
  }
  cestina(prod:IProducts){
    this.cartService.removeOneProduct(prod)
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
}
