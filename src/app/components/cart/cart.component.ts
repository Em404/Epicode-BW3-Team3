import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeaderService } from '../header/header.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  showCart!:boolean;
  showCartSubscription!:Subscription;

  constructor(private headerService:HeaderService, private route:ActivatedRoute ){}

  ngOnInit(){
    this.route.params.subscribe((params:any) =>{
    console.log(params.id);

    })
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
