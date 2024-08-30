import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  roles: string[] = [];
  isLoggedIn: boolean = false;
  showAdminBoard: boolean = false;

  constructor(private authService: AuthService, private storageService: StorageService, private route: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if(this.isLoggedIn) {
      const user: any = this.storageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        this.storageService.clean();
        window.location.reload();
      },
      error: err => {
        console.error(err);
      }
    });
    this.route.navigate(['/']);
  }

}
