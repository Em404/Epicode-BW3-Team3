import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProducts } from '../pages/home/models/i-products';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { ProdUser } from './prod-user';
import { ProdUserId } from './prod-user-id';

@Injectable({
  providedIn: 'root'
})
export class ProdUserService {
userProdUrl:string = 'http://localhost:3000/userProd'
  constructor(private http: HttpClient) {
   }

   addToMyProduct(obj:ProdUser):Observable<ProdUser>{
     return this.http.post<ProdUser>(this.userProdUrl, obj)
   }

   getByUserId(userId: number): Observable<ProdUserId[]> {
    return this.http.get<ProdUserId[]>(`${this.userProdUrl}?userId=${userId}`);
  }

   getProdUser():Observable<ProdUser>{
    return this.http.get<ProdUser>(this.userProdUrl)
   }
   deleteByUserId(userId: number): Observable<any> {
    const url = `${this.userProdUrl}/${userId}`;
    return this.http.delete(url);
  }
}
