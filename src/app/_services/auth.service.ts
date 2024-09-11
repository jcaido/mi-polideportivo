import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'https://polideportivoh2render.onrender.com/api/auth/';

const httOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) :Observable<any> {
    return this.http.post(
      AUTH_API + "signin",
      {
        username,
        password
      },
      httOptions
    );
  }

  register(username: string, email: string, password: string) :Observable<any> {
    return this.http.post(
      AUTH_API + "signup",
      {
       userName: username,
       email: email,
       password: password
      },
      httOptions
    );
  }

  logout() :Observable<any> {
    return this.http.get(AUTH_API + "signout", httOptions);
  }
}
