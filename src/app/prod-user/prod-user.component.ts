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
  prodotti: IProducts[] = [];
  id!:number
  constructor(
    private route: ActivatedRoute,
    private prodUser: ProdUserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.userId = params.userId;

      this.prodUser.getByUserId(this.userId).subscribe(
        (prodUser: ProdUserId[]) => {

          prodUser.map((prod:ProdUserId) => {
            console.log(prod);
            this.id = prod.id;
            this.prodotti = prod.prodotti;
          });
        },
      );
    });
  }


    delete(id: number): void {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.prodotti = this.prodotti.filter(product => product.id !== id);
          this.prodUser.deleteByUserId(id).subscribe(
            () => {

              Swal.fire({
                title: 'Deleted!',
                text: 'Your file has been deleted.',
                icon: 'success'
              }).then(()=>{

              })
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


}
