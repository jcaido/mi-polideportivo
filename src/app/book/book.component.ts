import { Component, OnInit } from '@angular/core';
import { FacilityService } from '../_services/facility.service';
import { Facility } from '../_helpers/facility';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit {

  facilities :Facility[] = [];
  errorMessage :string ='';
  isLoading: boolean = true;

  constructor(private facilityService :FacilityService) {}

  ngOnInit(): void {
    this.facilityService.getAllFacilities().subscribe({
      next: data => {
        this.isLoading = false;
        this.facilities = data;
      },
      error: err => {
        this.isLoading = false;
        this.errorMessage = err.error.message;
      }
    })
  }
}
