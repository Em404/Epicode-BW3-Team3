import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeaderService } from '../header/header.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  showCart!:boolean;
  showCartSubscription!:Subscription;

  constructor(private headerService:HeaderService){}

  ngOnInit(){
    this.showCartSubscription = this.headerService.showCart$.subscribe(data => {
      this.showCart = data;
    })
  }

  ngOnDestroy(){
    this.showCartSubscription.unsubscribe();
  }

  toggleShowCart():void{
    this.headerService.toggleShowCart(this.showCart);
  }
}
