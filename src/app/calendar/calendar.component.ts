import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { AvailableDateService } from '../_services/available-date.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit{

  @Input() idFacility?: string;

  errorMessage :string ='';

  selected: Date | null = null;
  date: any;

  availableDates: Date[] = [
    new Date(2024, 6, 3),
    new Date(2024, 6, 12),
    new Date(2024, 6, 20),
  ];

  availableDatesAPI: Date[] = [];

  constructor(private availableDateService: AvailableDateService) {}

  ngOnInit(): void {
    this.availableDateService.getAvailableDatesByFacility(this.idFacility!).subscribe(dates => {
      this.availableDatesAPI = dates;
      //console.log(this.availableDatesAPI);
      //console.log(this.availableDates);
    });
  }

  seleccionarFecha () {
    this.date = this.selected?.toLocaleDateString();
    return this.date;
  }

  dateFilter = (date: Date | null): boolean => {
    if (!date) {
      return true;
    }
    const time = date.getTime();
    return this.availableDates.some(d => d.getTime() === time);
    //return this.availableDatesAPI.some(d => d.getTime() === time);
  }

}
