import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

const AVAILABLE_DATE_API = 'https://polideportivoh2render.onrender.com/api/available-date/dates/';

const httOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AvailableDateService {

  constructor(private http: HttpClient) { }

  getAvailableDatesByFacility(id_facility: string): Observable<any> {
    return this.http.get<Date[]>(AVAILABLE_DATE_API + `${id_facility}`, httOptions).pipe(
      map((dates: any[]) => dates.map(date => new Date(date)))
    )
  }
}
