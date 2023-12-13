import { Component } from '@angular/core';
import { ProdUserService } from './prod-user.service';
import { ActivatedRoute } from '@angular/router';
import { IprodUser } from './iprod-user';

@Component({
  selector: 'app-prod-user',
  templateUrl: './prod-user.component.html',
  styleUrl: './prod-user.component.scss'
})
export class ProdUserComponent {

   constructor(private prodUserService:ProdUserService, private route: ActivatedRoute){}
userProd:IprodUser []= []


    ngOnInit() {
      this.route.params.subscribe((params: any) => {
       this.prodUserService.getProductsByIdUser(params.id).subscribe((res) => {

        this.userProd = res
        })
      });
    }
   }


