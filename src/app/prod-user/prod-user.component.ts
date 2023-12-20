import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProducts } from '../pages/home/models/i-products';
import { ProdUser } from './prod-user';
import { ProdUserService } from './prod-user.service';
import Swal from 'sweetalert2';
import { ProdUserId } from './prod-user-id';

@Component({
  selector: 'app-prod-user',
  templateUrl: './prod-user.component.html',
  styleUrls: ['./prod-user.component.scss'],
})
export class ProdUserComponent implements OnInit {
  userId!: number;
  ProduserArr:ProdUserId[] = []
  produser:ProdUserId ={
    prodotti: [],
    userId: 0,
    id: 0
  }
  prodotto!:IProducts
  constructor(
    private route: ActivatedRoute,
    private prodUser: ProdUserService,
    private router: Router,
  ) {}

  ngOnInit() {

    this.route.params.subscribe((params: any) => {
      this.userId = params.userId;

      this.prodUser.getByUserId(this.userId).subscribe(
        (prodUser: ProdUserId[]) => {
          this.ProduserArr = prodUser

          this.ProduserArr = prodUser
          prodUser.map((prod:ProdUserId) => {
            console.log(prod);

            this.produser = prod
            this.ProduserArr.push(prod)
            console.log(this.produser.prodotti);
          })
        });
      },
      );
    }


    delete(id: number): void {

      Swal.fire({
        title: 'Sei sicuro?',
        text: "Non potrai più tornare indietro!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminalo!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.prodUser.deleteByUserId(id).subscribe(
            () => {

              this.produser.prodotti.map(prod =>{
                this.deleteProducts(prod.id)
              })
            })
              Swal.fire({
                title: 'Eliminato!',
                text: 'Il tuo prodotto è stato eliminato ',
                icon: 'success'
              }).then(()=>{
            },
            (error) => {
              console.error('Error deleting the product', error);
              Swal.fire({
                title: 'Error',
                text: 'An error occurred while deleting the product.',
                icon: 'error'
              });
            }
          );
        }
      });
    }

    private deleteProducts(id:number){
      const indexToRemove = this.produser.prodotti.findIndex(product => product.id === id);
      if (indexToRemove !== -1) {
        this.produser.prodotti.splice(indexToRemove, 1);
      }
    }
}
