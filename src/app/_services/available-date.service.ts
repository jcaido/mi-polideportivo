import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AVAILABLE_DATE_API = 'http://localhost:8080/api/available-date/dates/';

const httOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AvailableDateService {

  constructor(private http: HttpClient) { }

  getAvailableDatesByFacility(id_facility: number): Observable<any> {
    return this.http.get(`AVAILABLE_DATE_API${id_facility}`, httOptions);
  }
}
