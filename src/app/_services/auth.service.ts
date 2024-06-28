import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

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
    )
  }

  register(username: string, email: string, password: string) :Observable<any> {
    return this.http.post(
      AUTH_API + "signup",
      {
       username,
       email,
       password
      },
      httOptions
    )
  }
}
