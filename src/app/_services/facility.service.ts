import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const FACILITY_API = 'http://localhost:8080/api/facility/';

const httOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class FacilityService {

  constructor(private http: HttpClient) { }

  getAllFacilities() :Observable<any> {
    return this.http.get(FACILITY_API + "facilities", httOptions);
  }
}
