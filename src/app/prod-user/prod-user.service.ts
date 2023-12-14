import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProducts } from '../pages/home/models/i-products';
import { Observable } from 'rxjs';
import { ProdUser } from '../prod-user';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

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

   getByUserId(userId:number):Observable<ProdUser>{
    return this.http.get<ProdUser>(`${this.userProdUrl}/${userId}`)
   }
   getProdUser():Observable<ProdUser>{
    return this.http.get<ProdUser>(this.userProdUrl)
   }
   deleteByUserId(userId: number): Observable<any> {
    const url = `${this.userProdUrl}/${userId}`;
    return this.http.delete(url);
  }
}
