import { Component, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentService } from '../payment/payment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-payment',
  templateUrl: './modal-payment.component.html',
  styleUrl: './modal-payment.component.css'
})
export class ModalPaymentComponent {

  readonly dialogRef = inject(MatDialogRef<ModalPaymentComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

  constructor(private paymentService: PaymentService, private _snackBar: MatSnackBar, private route: Router) {}

  confirm() {}

  cancel() {}

}
