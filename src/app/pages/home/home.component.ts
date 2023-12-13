import { Component } from '@angular/core';
import { HomeService } from './home.service';
import { IProducts } from './models/i-products';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  items: string[] = [
    '../../../assets/Screenshot 2023-11-13 112130.png',
    '../../../assets/Screenshot 2023-12-12 160131.png',
    '../../../assets/Screenshot 2023-12-13 145148.png',
    '../../../assets/Screenshot 2023-10-23 093746.png'
  ];
  activeIndex: number = 0;
  product!: IProducts[];
  styleProduct!:any[]
  isButtonHovered:boolean=false;
  isVisible:boolean = false
  route: any;
  authService: any;
  user: any;
  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.startCarosello()
    this.homeService.getAllProducts().subscribe(products => {
      if (products.length) {
        this.product = products;
       this.styleProduct = [...this.product];
       for(let p of this.styleProduct) p.hover=false
       this.isVisible = true
      }
    });
  }

  onButtonMouseOver(i:number):void{
    this.styleProduct[i].hover=true;

  }
  onButtonMouseOut(i:number):void{
    this.styleProduct[i].hover=false;
  }


  startCarosello(){
    setInterval(() => {
      this.toggleActive();
    }, 3000)
  }

  toggleActive() {
    this.activeIndex = (this.activeIndex + 1) % this.items.length;
  }




}
