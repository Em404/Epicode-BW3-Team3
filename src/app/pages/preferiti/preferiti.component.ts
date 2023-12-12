import { Component } from '@angular/core';
import { HomeService } from '../../../home.service';
import { IProducts } from '../home/models/i-products';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preferiti',
  templateUrl: './preferiti.component.html',
  styleUrl: './preferiti.component.scss'
})
export class PreferitiComponent {

  preferiti:IProducts[] = []
  subscribe!:Subscription
  constructor(private homeService:HomeService, private router:Router){}
ngOnInit(){
  this.getAllFavourites()
}

  getAllFavourites(){
    this.homeService.getFavourite().subscribe(favourite =>{
      if (favourite.length ) {
         this.preferiti = favourite
      }else{
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "La pagina è vuota",
          text: "Aggiungi un prodotto ai preferiti",
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate([''])
      }
    })
  }
  RemoveFromFavourite(id: number) {
    this.homeService.removeFromFavourite(id).subscribe((prod) => {
      if (prod.titolo) {
        Swal.fire(`Hai rimosso correttamente ${prod.titolo} dai tuoi preferiti`)
        this.preferiti = this.preferiti.filter(pref => pref.id !== id);
      } else{
        Swal.fire(`Hai rimosso correttamente questo prodotto dai tuoi preferiti`)
        this.preferiti = this.preferiti.filter(pref => pref.id !== id);
      }
    });
  }

}
