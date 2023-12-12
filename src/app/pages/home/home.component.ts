import { Component } from '@angular/core';
import { HomeService } from './home.service';
import { IProducts } from './models/i-products';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  product!: IProducts[];
  styleProduct!:any[]
  isButtonHovered:boolean=false;
  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.homeService.getAllProducts().subscribe(products => {
      this.product = products;
     this.styleProduct = [...this.product];
     for(let p of this.styleProduct) p.hover=false
    });
  }

  onButtonMouseOver(i:number):void{
    this.styleProduct[i].hover=true;
    console.log(this.styleProduct);

  }
  onButtonMouseOut(i:number):void{
    this.styleProduct[i].hover=false;
  }

}
