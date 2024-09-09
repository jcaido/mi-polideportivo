import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentIntentDto } from '../payment/payment-intent-dto';
import { Observable } from 'rxjs';

const PAYMENT_API = 'https://polideportivoh2render.onrender.com/api/payment/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: HttpClient) { }

  public pay(paymentIntentDto: PaymentIntentDto): Observable<string> {
    return this.httpClient.post<string>(PAYMENT_API + 'paymentIntent', paymentIntentDto, httpOptions);
  }

  public confirm(id: string, id_available_date_time: string, id_user: string): Observable<string> {
    return this.httpClient.post<string>(PAYMENT_API + `confirm/${id}/${id_available_date_time}/${id_user}`, {}, httpOptions);
  }

  public cancel(id: string): Observable<string> {
    return this.httpClient.post<string>(PAYMENT_API + `cancel/${id}`, {}, httpOptions);
  }

  public getReceiptPdf(
    id: string,
    nameFacility: string,
    dateSelected: string,
    timeBook: string,
    userName: string): Observable<Blob> {
      return this.httpClient.get(PAYMENT_API + `receipt/${id}/${nameFacility}/${dateSelected}/${timeBook}/${userName}`, {responseType: 'blob'})
    }
}
