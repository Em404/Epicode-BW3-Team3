import { Subscription } from 'rxjs';
import { HeaderService } from './header.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  showNav:boolean = false;
  isLogged:boolean = false;

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

  toggleShowNav():void{
    this.showNav = !this.showNav;
  }

  toggleShowCart():void{
    this.headerService.toggleShowCart(this.showCart);
  }

  toggleAll():void{
    this.toggleShowNav();
    this.toggleShowCart();
  }
}
