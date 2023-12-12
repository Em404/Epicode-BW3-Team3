import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProducts } from '../home/models/i-products';
import { HomeService } from '../../../home.service';
import { HeaderService } from '../../components/header/header.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prodotto',
  templateUrl: './prodotto.component.html',
  styleUrl: './prodotto.component.scss'
})
export class ProdottoComponent implements OnInit {

  constructor(private route: ActivatedRoute, private homeService: HomeService, private headerService: HeaderService, private router: Router) {}
  showNav: boolean = false;
  showCart!: boolean;
  preferiti: IProducts[] = [];
  prodotto: IProducts = {
    img: '',
    titolo: '',
    descrizione: '',
    prezzo: 0,
    quantita: 0,
    id: 0
  }

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
        if (res.quantita > 0) {
          this.prodotto = res;
        } else {
           Swal.fire('Questo prodotto non è più disponibile')
           this.router.navigate([''])
        }
      })
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

    addToCart(){

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
}
