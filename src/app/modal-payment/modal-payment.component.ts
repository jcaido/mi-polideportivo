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

  confirm(id: string) {
    this.paymentService.confirm(id).subscribe(
      data => {
        this.dialogRef.close();
        this._snackBar.open("Pago confirmado", "Cerrar", {
          duration: 5000
        })
      },
      err => {
        this.dialogRef.close();
        this._snackBar.open("Error al confirmar", "Cerrar", {
          duration: 5000
        })
      }
    )
  }

  cancel() {}

}
