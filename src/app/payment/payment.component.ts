import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { injectStripe, StripeCardComponent } from 'ngx-stripe';
import { PaymentService } from './payment.service';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { enviroment } from '../enviroments/enviroment';
import { PaymentIntentDto } from './payment-intent-dto';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

  @ViewChild(StripeCardComponent) cardElement!: StripeCardComponent;

  @Input() idAvailableDateTime?: string;

  constructor(private fb: FormBuilder, private paymentService: PaymentService) {}

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'es'
  };

  checkOutForm = this.fb.group({
    name: ['', Validators.required]
  });

  stripe = injectStripe(enviroment.publicAPIKey);

  payment: any = {};

  errorMessage: string = '';

  pay() {
    this.errorMessage = '';
    const userName = this.checkOutForm.get('name')?.value;
    this.stripe
      .createToken(this.cardElement.element)
      .subscribe((result) => {
        if (result.token) {
          const paymentIntentDto: PaymentIntentDto = {
            token: result.token.id,
            description: 'reserva pista x',
            amount: 10*100,
            currency: 'EUR'
          }
          this.paymentService.pay(paymentIntentDto).subscribe(
            data => {
              this.payment = data;
              console.log(data);
            }
          )
        } else if (result.error) {
          this.errorMessage = result.error.message!;
        }
      })
  }

}
