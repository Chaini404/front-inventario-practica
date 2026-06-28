import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

import { User } from '../../admin/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private apiUrl = 'https://backend-inventary-system-ii.onrender.com/auth';


  register(user: any): Observable<string> {

    return this.http.post<string>(
      `${this.apiUrl}/register`,
      user,
      {
        responseType: 'text' as 'json'
      }
    );

  }


  login(credentials: any): Observable<{token:string}> {

    return this.http.post<{token:string}>(
      `${this.apiUrl}/login`,
      credentials
    );

  }


  // ==========================
  // LISTAR USUARIOS
  // ==========================

  getUsers(): Observable<User[]> {

    return this.http.get<User[]>(
      this.apiUrl,
      {
        headers: this.getHeaders()
      }
    );

  }


private getHeaders(): HttpHeaders {


 const token = this.getToken();


 if(!token){

    console.log("NO HAY TOKEN");

    return new HttpHeaders();

 }


 return new HttpHeaders({

   Authorization:`Bearer ${token}`

 });


}



  saveToken(token:string):void {

    localStorage.setItem('token', token);

  }


  getToken():string|null {

    return localStorage.getItem('token');

  }


  isAuthenticated():boolean {

    return !!this.getToken();

  }


  logout():void {

    localStorage.removeItem('token');

  }



  getUsername():string|null {

    const token = this.getToken();

    if(!token) return null;


    const decoded:any = jwtDecode(token);

    return decoded.username;

  }

}