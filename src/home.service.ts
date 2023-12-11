import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProducts } from './app/pages/home/models/i-products';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  prodUrl:string = 'http://localhost:3000/prodotti'
  constructor(private http:HttpClient) {}

  getAllProducts():Observable<IProducts[]>{
   return  this.http.get<IProducts[]>(this.prodUrl)
  }

  getProductsById(id:number):Observable<IProducts>{

    return this.http.get<IProducts>(`${this.prodUrl}/${id}`)

  }
}
