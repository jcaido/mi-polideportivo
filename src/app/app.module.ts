import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from '../Material.Module';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { InformationComponent } from './information/information.component';
import { BookComponent } from './book/book.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { CalendarComponent } from './calendar/calendar.component';
import { NgxStripeModule } from 'ngx-stripe';
import { enviroment } from './enviroments/enviroment';
import { PaymentComponent } from './payment/payment.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalPaymentComponent } from './modal-payment/modal-payment.component';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    AdminComponent,
    AdminComponent,
    LoginComponent,
    BoardUserComponent,
    BoardAdminComponent,
    InformationComponent,
    BookComponent,
    MyBookingsComponent,
    CalendarComponent,
    PaymentComponent,
    ModalPaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    NgxStripeModule.forRoot(enviroment.publicAPIKey),
    HttpClientModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
