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
      const userIdParam = params.userId;
      console.log('UserId Param:', userIdParam); // Assicurati che userIdParam sia corretto

      this.prodUser.getByUserId(userIdParam).subscribe(
        (prodUser) => {
          console.log('ProdUser:', prodUser);
          this.prodotti = prodUser.prodotti;
        },
        (error) => {
          console.error('Errore durante il caricamento della pagina', error);
        }
      );
    });

  }
  edit(id:number){

  }
  delete(id:number){

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.prodUser.deleteByUserId(this.userId).subscribe(() => {
            this.prodotti = this.prodotti.filter(product => product.id !== id);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        })
      }
      });

    }

  }


