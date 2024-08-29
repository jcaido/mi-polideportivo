import { Component, OnInit } from '@angular/core';
import { BooksByUser } from '../_helpers/bookByUser';
import { StorageService } from '../_services/storage.service';
import { BooksService } from '../_services/books.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.css'
})
export class MyBookingsComponent implements OnInit {

  booksByUser: BooksByUser[] = [];
  idUser: string = '';
  nameUser: string = '';
  emailUser: string = '';
  errorMessage: string = '';
  displayedColumns: string[] = ['dateAvailable', 'timeBook', 'nameFacility'];

  constructor(private storageService: StorageService, private booksService: BooksService) {}

  ngOnInit(): void {
    this.idUser = this.storageService.getUser().id;
    this.nameUser = this.storageService.getUser().username;
    this.emailUser = this.storageService.getUser().email;
    this.booksService.getAllBooksByUser(this.idUser).subscribe({
      next: data => {
        this.booksByUser = data;
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    })
  }

}
