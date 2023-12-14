import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IProducts } from '../home/models/i-products';
import Swal from 'sweetalert2';
import { ProdUserService } from '../../prod-user/prod-user.service';
import { AuthService } from '../auth/auth.service';
import { ProdUser } from '../../prod-user';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})

export class FormComponent {
    model: IProducts ={
      totalPrice: 0,
      img: '',
      titolo: '',
      descrizione: '',
      prezzo: 0,
      quantita: 0,
      id: 0
    }


    produser:ProdUser= {
      prodotti: [],
      userId: 0
    }
    constructor(
      private httpClient: HttpClient,
      private route:ActivatedRoute,
      private prodUserService: ProdUserService,
      private router:Router,
      private authService:AuthService
       ) {}
    urlImage: RegExp = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/

    ngOnInit(){

      this.authService.user$.subscribe(user =>{
        this.produser.userId = user.user.id
      })
          }

          addToMyProducts(){
            if (this.validaDatiForm()) {
              this.produser.prodotti.push(this.model);

             this.prodUserService.addToMyProduct(this.produser).subscribe(
        (data) => {
          console.log(data);
          Swal.fire('Prodotto aggiunto correttamente');
        },
        (error) => {
          console.error(`Errore durante l'aggiunta del prodotto:`, error);
          Swal.fire(`Errore durante l'aggiunta del prodotto`);
        }
      );
            }
          }

    checkQuantita():boolean{
      if ( this.model.quantita > 0) {
       return true
      }
      return false
    }

    onSubmit() {
      if (this.urlImage.test(this.model.img) && this.model.quantita > 0 ) {
          this.inviaDatiAlServer();
        this.addToMyProducts()
      } else{
        Swal.fire(`Sistema l'url o aumenta la quantità del prodotto almeno ad 1`)
      }


    }

    validaDatiForm(): boolean {
        if (!this.model.titolo) {
            return false;
        }
        return true;
    }

    inviaDatiAlServer() {
      this.httpClient.post('http://localhost:3000/prodotti', this.model).subscribe((data) =>{

    });
    }

    svuotaForm(){
      this.model = {
        totalPrice: 0,
        img: '',
        titolo: '',
        descrizione: '',
        prezzo: 0,
        quantita: 0,
        id: 0
      };
    }
}
