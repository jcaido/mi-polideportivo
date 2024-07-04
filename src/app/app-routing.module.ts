import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { InformationComponent } from './information/information.component';
import { BookComponent } from './book/book.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'information', component: InformationComponent },
  { path: 'book', component: BookComponent },
  { path: 'myBookings', component: MyBookingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
