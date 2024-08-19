import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentIntentDto } from './payment-intent-dto';
import { Observable } from 'rxjs';

const PAYMENT_API = 'http://localhost:8080/api/payment/';

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
}
