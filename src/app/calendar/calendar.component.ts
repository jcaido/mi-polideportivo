import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { AvailableDateService } from '../_services/available-date.service';
import { TimeBookService } from '../_services/time-book-service';
import { TimeBookAvailable } from '../_helpers/timeBookAvailable';

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
    new Date(2024, 6, 8),
    new Date(2024, 6, 15),
    new Date(2024, 6, 20),
  ];

  availableDatesAPI: Date[] = [];

  dateAPI: string[] = [];
  dateModify :string = "";

  timeBookAvailable: TimeBookAvailable[] = [];

  timesAvailablesVisibled: boolean = false;

  paymentFormVisible: boolean = false;
  idAvailableDateTime!: number;

  constructor(private availableDateService: AvailableDateService, private timeBookService: TimeBookService) {}

  ngOnInit(): void {
    this.availableDateService.getAvailableDatesByFacility(this.idFacility!).subscribe(dates => {
      this.availableDatesAPI = dates;
      //console.log(this.availableDatesAPI);
      //console.log(this.availableDates);
    });
  }

  onDateSelected(event: Date | null): void {
    this.selected = event;
    this.date = this.selected?.toLocaleDateString();
    this.dateAPI = this.date.split("/");
    this.dateModify = this.dateAPI[2] + "-" + this.monthDayModify(this.dateAPI[1]) + "-" + this.monthDayModify(this.dateAPI[0]);
    this.paymentFormVisible = false;
    this.timeBookService.getAvailableDateTimeByAvailableDateAndFacility(this.dateModify, this.idFacility!).subscribe(data => {
      this.timesAvailablesVisibled = true;
      this.timeBookAvailable = data;
      console.log('Fecha seleccionada:', this.date);
      console.log(this.timeBookAvailable);
    });
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

  timeSelected(id: number) {
    this.idAvailableDateTime = id;
    this.paymentFormVisible = true;
  }

}
