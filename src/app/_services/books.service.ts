import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//const BOOKS_API = 'http://localhost:8080/api/books/';
const BOOKS_API = 'https://polideportivoh2render.onrender.com/api/books/';

const httOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private httpClient: HttpClient) { }

  getAllBooksByUser(id_user: string): Observable<any> {
    return this.httpClient.get(BOOKS_API + `books_by_user/${id_user}`, httOptions);
  }
}
