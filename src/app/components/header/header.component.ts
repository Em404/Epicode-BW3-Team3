import { AuthService } from './../../pages/auth/auth.service';
import { Subscription } from 'rxjs';
import { HeaderService } from './header.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart/cart.service';
import Swal from 'sweetalert2';
import { IProducts } from '../../pages/home/models/i-products';
import { IUser } from '../../pages/auth/models/i-user';

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
  cartSubscription!:Subscription;

  user:IUser = {
    nome: '',
    cognome: '',
    username: '',
    email: '',
    password: '',
    genere: '',
    data_di_nascita: 0,
    id: 0,
  }

  userSubscription!: Subscription

  constructor(
    private headerService:HeaderService,
    private authService:AuthService,
    private router:Router,
    private cartService:CartService,
  ){}

  ngOnInit(){
    this.isLoggedSubscription = this.authService.isLogged$.subscribe(data => {
      this.isLogged = data;
    })

    this.showCartSubscription = this.headerService.showCart$.subscribe(data => {
      this.showCart = data;
    })

    this.userSubscription = this.authService.user$.subscribe(data => {
      this.user = data.user
    })

    this.cartSubscription = this.cartService.cart$.subscribe((data)=> {
      this.cart = data;
    })
  }


  ngOnDestroy(){
    this.isLoggedSubscription.unsubscribe();
    this.showCartSubscription.unsubscribe();
    this.userSubscription.unsubscribe()
  }

  toggleShowNav():void{
    this.showNav = !this.showNav;
  }

  toggleShowCart():void{
    this.headerService.toggleShowCart(this.showCart);
  }

  closeCart(){
    this.headerService.closeCart();
  }

  toggleAll():void{
    this.toggleShowNav();
    this.toggleShowCart();

    this.showCart = !!this.cart.length
    if (!this.cart.length) {
      Swal.fire('Il carrello è vuoto').then((result) => {
        this.closeCart();
      })
    }
  }

  handleRedirect(){
    this.toggleShowNav();
    if (this.isLogged) {
      this.authService.logout();
    } else {
      this.router.navigate(["/auth/login"]);
    }
  }
}
