import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home/home.service';
import { IProducts } from '../home/models/i-products';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preferiti',
  templateUrl: './preferiti.component.html',
  styleUrls: ['./preferiti.component.scss']
})
export class PreferitiComponent implements OnInit {

  preferiti: IProducts[] = [];
  isExpanded: boolean = false;

  constructor(private homeService: HomeService, private router: Router) {}

  ngOnInit() {
    this.getAllFavourites();
  }

  getAllFavourites() {
    this.homeService.getFavourite().subscribe(favourite => {
      if (favourite.length) {
        this.preferiti = favourite;
      } else {
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: "La pagina è vuota",
          text: "Aggiungi un prodotto ai preferiti",
          showConfirmButton: false,
          timer: 2500
        });
        this.router.navigate(['']);
      }
    });
  }

  RemoveFromFavourite(id: number) {
    this.homeService.removeFromFavourite(id).subscribe((prod) => {
      if (prod.titolo) {
        Swal.fire(`Hai rimosso correttamente ${prod.titolo} dai tuoi preferiti`);
        this.preferiti = this.preferiti.filter(pref => pref.id !== id);
      } else {
        Swal.fire(`Hai rimosso correttamente questo prodotto dai tuoi preferiti`);
        this.preferiti = this.preferiti.filter(pref => pref.id !== id);
      }
    });
  }

  toggleCardExpansion() {
    this.isExpanded = !this.isExpanded;
  }
}
