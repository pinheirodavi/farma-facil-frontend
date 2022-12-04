import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  constructor(private http: HttpClient) { }

  findProviderById(id: any) {
    return this.http.get<any>(`${environment.apiUrl}/v1/providers/${id}`);
  }

  createProvider(provider: Object){
    return this.http.post<any>(`${environment.apiUrl}/v1/providers`, provider);
  }

  updateProvider(provider: Object, id: any){
    return this.http.put<any>(`${environment.apiUrl}/v1/providers/${id}`, provider);
  }

}
