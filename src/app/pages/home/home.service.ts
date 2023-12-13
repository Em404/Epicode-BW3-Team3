import { PreferitiComponent } from '../preferiti/preferiti.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProducts } from './models/i-products';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  prodUrl:string = 'http://localhost:3000/prodotti'
  prefUrl:string = 'http://localhost:3000/preferiti'

  constructor(private http:HttpClient) {}

  getAllProducts():Observable<IProducts[]>{
   return  this.http.get<IProducts[]>(this.prodUrl)
  }

  getProductsById(id:number):Observable<IProducts>{
    return this.http.get<IProducts>(`${this.prodUrl}/${id}`)
  }

  addToFavourite(prod:IProducts):Observable <IProducts>{
    return this.http.post<IProducts>(this.prefUrl, prod)
  }
  removeFromFavourite(id:number):Observable<IProducts>{
    return this.http.delete<IProducts>(`${this.prefUrl}/${id}`)
  }

  getFavourite():Observable<IProducts[]>{
    return this.http.get<IProducts[]>(this.prefUrl)
  }

}
