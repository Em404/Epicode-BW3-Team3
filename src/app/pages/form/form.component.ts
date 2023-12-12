import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IProducts } from '../home/models/i-products';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})

export class FormComponent {
    model: IProducts= {
        id: 0,
        titolo: '',
        img: '',
        descrizione: '',
        quantita: 1,
        prezzo: 0
    };

    constructor(private httpClient: HttpClient) {}

    isValidUrl(url: string): boolean {
      const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocollo
         '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // dominio di primo livello
         '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
         '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
         '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
         '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
      return pattern.test(url);
    }

    onSubmit() {
      if (this.isValidUrl(this.model.img)) {
          this.inviaDatiAlServer();
      } else {
          console.error('L\'URL dell\'immagine non è valido');
      }
    }

    validaDatiForm(): boolean {
        if (!this.model.titolo) {
            return false;
        }
        return true;
    }

    inviaDatiAlServer() {
      this.httpClient.post('http://localhost:3000/prodotti', {
          img: this.model.img,
          titolo: this.model.titolo,
          descrizione: this.model.descrizione,
          prezzo: this.model.prezzo,
          quantità: this.model.quantita
      }).subscribe({
          next: (response) => {
              console.log('Prodotto aggiunto', response);
          },
          error: (error) => {
              console.error('Errore durante l\'aggiunta del prodotto', error);
          }
        });
    }
}
