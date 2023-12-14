import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProducts } from '../home/models/i-products';
import { HomeService } from '../home/home.service';
import { HeaderService } from '../../components/header/header.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { CartService } from '../../components/cart/cart.service';
import { ProdUserService } from '../../prod-user/prod-user.service';

@Component({
  selector: 'app-prodotto',
  templateUrl: './prodotto.component.html',
  styleUrl: './prodotto.component.scss'
})
export class ProdottoComponent implements OnInit {
  cart: IProducts[] = []

  constructor(
    private route: ActivatedRoute,
    private homeService: HomeService,
    private headerService: HeaderService,
    private router: Router,
    private cartService:CartService,
    private prodUserService:ProdUserService
     ) {}

  showNav: boolean = false;
  showCart!: boolean;
  preferiti: IProducts[] = [];
  prodotto!: IProducts


  ngOnInit() {
    this.headerService.showCart$.subscribe(data => {
      this.showCart = data;
    })
    const prefLocal = localStorage.getItem('preferiti');
    if (prefLocal) {
      this.preferiti = JSON.parse(prefLocal);
    }

    this.route.params.subscribe((params: any) => {
      this.homeService.getProductsById(params.id).subscribe((res) => {
        console.log(res);

        if (res.quantita > 0) {
          this.prodotto = res;
        } else {
          Swal.fire('Questo prodotto non è più disponibile').then(result => {
            this.router.navigate(['']);
          });
        }
      });

    });



  }

  toggleShowNav(): void {
    this.showNav = !this.showNav;
  }

  toggleShowCart(): void {
    this.headerService.toggleShowCart(this.showCart);
  }

  toggleAll(): void {
    this.toggleShowNav();
    this.toggleShowCart();
  }


  addToFavourite(): any {
    const isPresent = this.preferiti.some((p) => p.id === this.prodotto.id)

    if (isPresent) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${this.prodotto.titolo} è gia nei preferiti`,


      })

    } else {
      return this.homeService.addToFavourite(this.prodotto).subscribe(prod => {
        this.preferiti.unshift(this.prodotto);
        localStorage.setItem('preferiti', JSON.stringify(this.preferiti))
        Swal.fire(`Hai aggiunto ${this.prodotto.titolo} ai tuoi preferiti`)
      });
    }
  }

  addToCart(){
    this.cartService.addToCart(this.prodotto)
  }

}
