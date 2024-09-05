import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { AvailableDateService } from '../_services/available-date.service';
import { TimeBookService } from '../_services/time-book-service';
import { TimeBookAvailable } from '../_helpers/timeBookAvailable';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit{

  @Input() idFacility?: string;
  @Input() nameFacility?: string;

  errorMessage :string ='';

  selected: Date | null = null;
  date: any;

  availableDates: Date[] = [
    new Date(2024, 8, 2),
    new Date(2024, 8, 15),
    new Date(2024, 8, 20),
    new Date(2024, 9, 3),
    new Date(2024, 9, 16),
    new Date(2024, 9, 21),
    new Date(2024, 10, 2),
    new Date(2024, 10, 18),
    new Date(2024, 10, 26),
    new Date(2024, 11, 8),
    new Date(2024, 11, 12),
    new Date(2024, 11, 24)
  ];

  availableDatesAPI: Date[] = [];

  dateAPI: string[] = [];
  dateModify :string = "";

  timeBookAvailable: TimeBookAvailable[] = [];

  timesAvailablesVisibled: boolean = false;
  paymentFormVisible: boolean = false;
  closeTimesAvailable: boolean = false;

  idAvailableDateTime!: string;
  timeBook!: string;

  constructor(private availableDateService: AvailableDateService, private timeBookService: TimeBookService, private _snackBar: MatSnackBar,) {
    this.selected = new Date();
  }

  ngOnInit(): void {
    this.availableDateService.getAvailableDatesByFacility(this.idFacility!).subscribe(
      dates => {
        this.availableDatesAPI = dates;
        //console.log(this.availableDatesAPI);
        //console.log(this.availableDates);
      });


    this.date = this.selected?.toLocaleDateString();
    this.dateAPI = this.date.split("/");
    this.dateModify = this.dateAPI[2] + "-" + this.monthDayModify(this.dateAPI[1]) + "-" + this.monthDayModify(this.dateAPI[0]);
    this.paymentFormVisible = false;
    this.timeBookService.getAvailableDateTimeByAvailableDateAndFacility(this.dateModify, this.idFacility!).subscribe(
      data => {
        this.timeBookAvailable = data;
      });
  }

  onDateSelected(selectedDate: Date | null): void {

    if (new Date() > selectedDate!) {
      this._snackBar.open("fecha no disponible", "Cerrar", {
        duration: 5000
      });
    } else {
      this.selected= selectedDate;
      this.date = this.selected?.toLocaleDateString();
      this.dateAPI = this.date.split("/");
      this.dateModify = this.dateAPI[2] + "-" + this.monthDayModify(this.dateAPI[1]) + "-" + this.monthDayModify(this.dateAPI[0]);
      this.paymentFormVisible = false;
      this.timeBookService.getAvailableDateTimeByAvailableDateAndFacility(this.dateModify, this.idFacility!).subscribe(
        data => {
          this.timeBookAvailable = data;
          this.timesAvailablesVisibled = true;
          this.closeTimesAvailable = true;
      });
    }
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

  timeSelected(id: number, timeBook: any) {
    this.idAvailableDateTime = id.toString();
    this.timeBook = timeBook;
    this.paymentFormVisible = true;
  }

  closeTimesAvailables() {
    this.timesAvailablesVisibled = false;
    this.closeTimesAvailable = false;
    this.paymentFormVisible = false;
    this.selected = new Date();
  }
}
