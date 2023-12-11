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

  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.homeService.getAllProducts().subscribe(products => {
      this.product = products;
    });
  }

}
