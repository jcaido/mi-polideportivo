import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TimeBookAvailable } from '../_helpers/timeBookAvailable';

const TIMEBOOK_API = 'http://localhost:8080/api/available-date-time/';

const httOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class TimeBookServiceService {

  constructor(private http: HttpClient) { }

  getAvailableDateTimeByAvailableDateAndFacility(date: string, id_facility: number): Observable<any> {
    return this.http.get<TimeBookAvailable>(TIMEBOOK_API + "available-times/" + `${date}` + "/" + `${id_facility}`, httOptions)
  }
}
