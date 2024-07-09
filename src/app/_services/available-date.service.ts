import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Facility } from '../_helpers/facility';

const AVAILABLE_DATE_API = 'http://localhost:8080/api/available-date/dates/';
const PRUEBA_API = 'http://localhost:8080/api/available-date/disabled';

const httOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AvailableDateService {

  constructor(private http: HttpClient) { }

  getAvailableDatesByFacility(id_facility: string): Observable<any> {
    return this.http.get(AVAILABLE_DATE_API + `${id_facility}`, httOptions);
  }

  getDisabledDates(): Observable<Date[]> {
    return this.http.get<Date[]>(PRUEBA_API, httOptions).pipe(
      map((dates: any[]) => dates.map(date => new Date(date)))
    );
  }

}
