import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IProducts } from '../home/models/i-products';
import Swal from 'sweetalert2';
import { ProdUserService } from '../../prod-user/prod-user.service';

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
    constructor(private httpClient: HttpClient, private route:ActivatedRoute, private prodUserService:ProdUserService, private router:Router) {}
    urlImage: RegExp = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/


    checkQuantita():boolean{
      if ( this.model.quantita > 0) {
       return true
      }
      return false
    }

    onSubmit() {
      if (this.urlImage.test(this.model.img) && this.model.quantita > 0 ) {
          this.inviaDatiAlServer();
        this.prodUserService.addToMyProduct(this.model).subscribe((data)=>{
          Swal.fire('prodotto aggiunto correttamente')
        })
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
    console.log(data);

    });
    }
}
