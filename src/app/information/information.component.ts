import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrl: './information.component.css'
})
export class InformationComponent implements OnInit {

  username: string = '';

  constructor(private storageService: StorageService) {
    this.username = storageService.getUser().username;
  }

  ngOnInit(): void {
    if (!sessionStorage.getItem('pageReloaded')) {
      // Marca la página como recargada
      sessionStorage.setItem('pageReloaded', 'true');
      // Recargar la página
      window.location.reload();
    } else {
      // Limpia el estado para futuras recargas
      sessionStorage.removeItem('pageReloaded');
    }
  }
}
