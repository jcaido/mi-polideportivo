import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Facility } from '../_helpers/facility';

const FACILITY_API = 'https://polideportivoh2render.onrender.com/api/facility/';

const httOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class FacilityService {

  constructor(private http: HttpClient) { }

  getAllFacilities() :Observable<any> {
    return this.http.get<Facility>(FACILITY_API + "facilities", httOptions);
  }
}
