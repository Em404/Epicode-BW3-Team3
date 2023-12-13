import { AuthService } from './../../pages/auth/auth.service';
import { Subscription } from 'rxjs';
import { HeaderService } from './header.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../../pages/auth/models/i-user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  showNav:boolean = false;

  isLogged!:boolean;
  showCart!:boolean;
  isLoggedSubscription!:Subscription;
  showCartSubscription!:Subscription;

  constructor(
    private headerService:HeaderService,
    private authService:AuthService,
    private router:Router,
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
  }

  handleRedirect(){
    if (this.isLogged) {
      this.authService.logout();
    } else {
      this.router.navigate(["/auth/login"]);
    }
  }
}
