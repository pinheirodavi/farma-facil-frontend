import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  findProviders(){
    return this.http.get<any>(`${environment.apiUrl}/providers`)
  }

  createProduct(product: any){
    console.log(product)
    return this.http.post<any>(`${environment.apiUrl}/medicines`,product)
  }

  findProducts(){
    return this.http.get<any>(`${environment.apiUrl}/medicines`)
  }

  findProductById(id: any){
    return this.http.get<any>(`${environment.apiUrl}/medicines/${id}`)
  }

  updateProduct(product: any, id: any){
    return this.http.put<any>(`${environment.apiUrl}/medicines/${id}`,product)
  }

  deleteProduct(id: any){
    return this.http.delete<any>(`${environment.apiUrl}/medicines/${id}`)
  }

  findProviderById(id: any) {
    return this.http.get<any>(`${environment.apiUrl}/providers/${id}`);
  }

}
