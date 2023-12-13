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
    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/d1/10/30/getlstd-property-photo.jpg?w=1200&h=-1&s=1',
    'https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg',
    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/d1/10/30/getlstd-property-photo.jpg?w=1200&h=-1&s=1'
  ];
  activeIndex: number = 0;
  product!: IProducts[];
  styleProduct!:any[]
  isButtonHovered:boolean=false;
  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.startCarosello()
    this.homeService.getAllProducts().subscribe(products => {
      this.product = products;
     this.styleProduct = [...this.product];
     for(let p of this.styleProduct) p.hover=false
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
