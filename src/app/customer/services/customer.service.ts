import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  createCustomer(customer: any){
    console.log(customer)
    return this.http.post<any>(`${environment.apiUrl}/customers`,customer)
  }

  findCustomers(){
    return this.http.get<any>(`${environment.apiUrl}/customers`)
  }

  findCustomerById(id: any){
    return this.http.get<any>(`${environment.apiUrl}/customers/${id}`)
  }

  deleteCustomer(id: any){
    return this.http.delete<any>(`${environment.apiUrl}/customers/${id}`)
  }

  updateCustomer(product: any, id: any){
    return this.http.put<any>(`${environment.apiUrl}/customers/${id}`,product)
  }

}
