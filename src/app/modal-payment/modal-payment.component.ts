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

  nameFacility: string = '';
  dateSelected: string = '';
  timeBook: string = '';
  userName: string = '';

  idUser: string = '';

  constructor(private paymentService: PaymentService, private _snackBar: MatSnackBar, private route: Router, private storageService: StorageService) {}

  ngOnInit(): void {
    this.idUser = this.storageService.getUser().id;
    this.nameFacility = this.data.nameFacility;
    this.dateSelected = this.data.dateSelected;
    this.timeBook = this.data.timeBook;
    this.userName = this.data.userName;
  }

  confirm(id: string, id_available_date_time: string, id_user: string) {
    this.paymentService.confirm(id, id_available_date_time, id_user).subscribe(
      data => {
        this.dialogRef.close();
        this._snackBar.open("Pago confirmado", "Cerrar", {
          duration: 5000
        });
        this.paymentService.getReceiptPdf(id, this.nameFacility, this.timeBook, this.userName).subscribe(
          (data: Blob) => {
            const downloadURL = window.URL.createObjectURL(data);
            const link = document.createElement('a');
            link.href = downloadURL;
            link.download = 'receipt.pdf';
            link.click();
          },
          error => {
            console.error('Error downloading the receipt', error);
          }
        )
        //this.route.navigate(['/']);
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
