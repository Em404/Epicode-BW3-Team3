import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProducts } from '../pages/home/models/i-products';
import { IprodUser } from './iprod-user';

@Injectable({
  providedIn: 'root'
})
export class ProdUserService {

  constructor(private http: HttpClient) { }
  prodUserUrl:string = 'http://localhost:3000/prodottiUser'


  getAllProductsUser():Observable<IProducts[]>{
    return  this.http.get<IProducts[]>(this.prodUserUrl)
   }

   addToMyProduct(prod:IprodUser):Observable<IprodUser>{
   return  this.http.post<IprodUser>(this.prodUserUrl, prod)
   }

   getProductsByIdUser(id:number):Observable<IProducts[]>{
     return this.http.get<IProducts[]>(`${this.prodUserUrl}/${id}`)
   }


}
