import { take } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  findUsers(){
    return this.http.get<any>(`${environment.apiUrl}/users/`)
  }

  findUserById(id: string){
    return this.http.get<any>(`${environment.apiUrl}/users/${id}`)
  }

  createUser(user: any){
    console.log(user)
    return this.http.post<any>(`${environment.apiUrl}/users/`,user)
  }

  updateUser(user:any, id: string){
    return this.http.put<any>(`${environment.apiUrl}/users/${id}`,user)
  }
}
