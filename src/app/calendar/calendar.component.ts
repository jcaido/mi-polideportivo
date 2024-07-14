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

  dateAPI: string[] = [];
  dateModify :string = "";


  constructor(private availableDateService: AvailableDateService) {}

  ngOnInit(): void {
    this.availableDateService.getAvailableDatesByFacility(this.idFacility!).subscribe(dates => {
      this.availableDatesAPI = dates;
      //console.log(this.availableDatesAPI);
      //console.log(this.availableDates);
    });
  }

  dateSelection () {
    this.date = this.selected?.toLocaleDateString();
    if(this.date) {
      this.dateAPI = this.date.split("/");
      this.dateModify = this.dateAPI[2] + "-" + this.monthDayModify(this.dateAPI[1]) + "-" + this.monthDayModify(this.dateAPI[0]);
      console.log(this.dateModify);
    }
    return this.date;
  }

  monthDayModify(monthDay: string): string {
    if (monthDay.length === 1) {
      return "0" + monthDay;
    }
    return monthDay
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
