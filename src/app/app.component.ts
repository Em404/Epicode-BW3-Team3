import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from './pages/home/home.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bw3-app';
  IsCliccked:boolean  = true
  constructor(protected homeService:HomeService) {
  }
mostraChat(){
  this.IsCliccked = false
}
  ngOnInit(){

    setTimeout(() => {
      this.homeService.nascondiSezione();
    }, 4500);
  }
}
