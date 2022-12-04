import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  constructor(private http: HttpClient) { }

  findAllProviders() {
    return this.http.get<any>(`${environment.apiUrl}/providers`);
  }

  findProviderById(id: any) {
    return this.http.get<any>(`${environment.apiUrl}/providers/${id}`);
  }

  createProvider(provider: Object){
    console.log(provider)
    return this.http.post<any>(`${environment.apiUrl}/providers`, provider);
  }

  updateProvider(provider: Object, id: any){
    return this.http.put<any>(`${environment.apiUrl}/providers/${id}`, provider);
  }

  deleteProvider(id: any) {
    return this.http.delete<any>(`${environment.apiUrl}/providers/${id}`);
  }

}
