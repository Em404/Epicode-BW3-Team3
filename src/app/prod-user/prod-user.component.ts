import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProducts } from '../pages/home/models/i-products';
import { IUser } from '../pages/auth/models/i-user';
import { AuthService } from '../pages/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { ProdUser } from '../prod-user';
import { ProdUserService } from './prod-user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prod-user',
  templateUrl: './prod-user.component.html',
  styleUrl: './prod-user.component.scss',
})
export class ProdUserComponent {
  constructor(
    private route: ActivatedRoute,
    private prodUser: ProdUserService,
    private router: Router
  ) {}

  userId!: number;
  prodotti: IProducts[] = [];
  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.userId = params.id;
      if (this.userId) {
        this.prodUser.getByUserId(this.userId).subscribe(
          (prodUser: ProdUser) => {
            this.prodotti = prodUser.prodotti;
          },
          (error) => {
            Swal.fire('Errore durante il caricamento della pagina').then(() => {
              this.router.navigate(['']);
            });
          }
        );
      }
    });
  }
  edit(id:number){

  }
  delete(id:number){
    this.prodUser.deleteByUserId(this.userId).subscribe(() => {

      Swal.fire({
        title: "Prodotti eliminati",
        text: "Tutti i prodotti associati a questo utente sono stati eliminati",
        icon: "success"
      });
    }, (error) => {
      console.error("Errore durante l'eliminazione dei prodotti:", error);
      Swal.fire({
        title: "Errore",
        text: "Si è verificato un errore durante l'eliminazione dei prodotti. Riprova più tardi.",
        icon: "error"
      });
    });


  }
}

