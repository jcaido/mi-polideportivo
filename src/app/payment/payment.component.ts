import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { injectStripe, StripeCardComponent } from 'ngx-stripe';
import { PaymentService } from '../_services/payment.service';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { enviroment } from '../enviroments/enviroment';
import { PaymentIntentDto } from './payment-intent-dto';
import { MatDialog } from '@angular/material/dialog';
import { ModalPaymentComponent } from '../modal-payment/modal-payment.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

  @ViewChild(StripeCardComponent) cardElement!: StripeCardComponent;

  @Input() idAvailableDateTime?: string;
  @Input() nameFacility?: string;
  @Input() dateSelected: any;
  @Input() timeBook: any;

  isLoading: boolean = false;

  readonly dialog = inject(MatDialog);

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
    this.isLoading = true;
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
              this.isLoading = false;
              this.payment = data;
              this.dialog.open(ModalPaymentComponent,
                {data: {
                  id: this.payment.id,
                  nameFacility: this.nameFacility,
                  dateSelected: this.dateSelected,
                  timeBook: this.timeBook,
                  userName: userName,
                  idAvailableDateTime: this.idAvailableDateTime,
                }
              })
            }
          )
        } else if (result.error) {
          this.isLoading = false;
          this.errorMessage = result.error.message!;
        }
      })
  }

}
