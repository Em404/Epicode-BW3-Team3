import { AuthService } from './../../pages/auth/auth.service';
import { Subscription } from 'rxjs';
import { HeaderService } from './header.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../../pages/auth/models/i-user';
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../cart/cart.service';
import Swal from 'sweetalert2';
import { IProducts } from '../../pages/home/models/i-products';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  showNav:boolean = false;
  cart:IProducts[]= []
  isLogged!:boolean;
  showCart!:boolean;
  isLoggedSubscription!:Subscription;
  showCartSubscription!:Subscription;

  constructor(
    private headerService:HeaderService,
    private authService:AuthService,
    private router:Router,
    private cartService: CartService
  ){}

  ngOnInit(){
    this.isLoggedSubscription = this.authService.isLogged$.subscribe(data => {
      this.isLogged = data;
    })

    this.showCartSubscription = this.headerService.showCart$.subscribe(data => {
      this.showCart = data;
    })
  }


  ngOnDestroy(){
    this.isLoggedSubscription.unsubscribe();
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
    this.cartService.cart$.subscribe((data)=> {
      this.cart = data
      this.showCart = data.length > 0
      if (!data.length) {
        Swal.fire('Il carrello è vuoto')
        this.toggleShowCart()
      }
    })
  }

  handleRedirect(){
    if (this.isLogged) {
      this.authService.logout();
    } else {
      this.router.navigate(["/auth/login"]);
    }
  }
}
