import { Component, inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentService } from '../payment/payment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-modal-payment',
  templateUrl: './modal-payment.component.html',
  styleUrl: './modal-payment.component.css'
})
export class ModalPaymentComponent implements OnInit {

  readonly dialogRef = inject(MatDialogRef<ModalPaymentComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

  idUser: string = '';

  constructor(private paymentService: PaymentService, private _snackBar: MatSnackBar, private route: Router, private storageService: StorageService) {}

  ngOnInit(): void {
    this.idUser = this.storageService.getUser().id;
  }

  confirm(id: string, id_available_date_time: string, id_user: string) {
    this.paymentService.confirm(id, id_available_date_time, id_user).subscribe(
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

  cancel(id: string) {
    this.paymentService.cancel(id).subscribe(
      data => {
        this.dialogRef.close();
        this._snackBar.open("Pago canelado", "Cerrar", {
          duration: 5000
        })
      },
      err => {
        this.dialogRef.close();
        this._snackBar.open("Error al cancelar", "Cerrar", {
          duration: 5000
        })
      }
    )
  }

}
