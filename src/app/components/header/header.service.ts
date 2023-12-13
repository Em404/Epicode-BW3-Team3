import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  showCartSubject = new BehaviorSubject<boolean>(false);
  showCart$ = this.showCartSubject.asObservable();
  constructor(){}

  toggleShowCart(bool:boolean):void{
    this.showCartSubject.next(!bool);
  }

  closeCart():void{
    this.showCartSubject.next(false);
  }

}
