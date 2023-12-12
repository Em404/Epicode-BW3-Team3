import { Component } from '@angular/core';
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
export class ProdottoComponent {

  constructor(private route:ActivatedRoute, private homeService:HomeService, private headerService:HeaderService, private router:Router ){}
  showNav:boolean = false;
  showCart!:boolean;

  prodotto:IProducts = {
    img: '',
    titolo: '',
    descrizione: '',
    prezzo: 0,
    quantita: 0,
    id: 0
  }

ngOnInit(){
  this.headerService.showCart$.subscribe(data => {
      this.showCart = data;
    })

  this.route.params.subscribe((params:any)=>{
    this.homeService.getProductsById(params.id).subscribe((res) =>{
      this.prodotto = res ;
    })
  })

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


addToFavourite(){
  this.homeService.addToFavourite(this.prodotto).subscribe(prod =>{
    Swal.fire(`Hai aggiunto ${this.prodotto.titolo} ai tuoi preferiti`)}
  )
}


}
