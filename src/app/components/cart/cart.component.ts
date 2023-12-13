import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeaderService } from '../header/header.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from './cart.service';
import { IProducts } from '../../pages/home/models/i-products';

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
    private route:ActivatedRoute,
    private cartService:CartService
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

  remove(){}

  getSelect(quantity: number): number[] {
    for (let i = 1; i <= quantity; i++) {
      this.result.push(i);
    }
    return this.result;
  }

  ngOnDestroy(){
    this.showCartSubscription.unsubscribe();
  }

  toggleShowCart():void{
    this.headerService.toggleShowCart(this.showCart);
  }
}
