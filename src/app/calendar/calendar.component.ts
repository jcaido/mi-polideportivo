import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent {

  selected: Date | null = null;
  date: any;

  disabledDates = [
    new Date(2024, 6, 3),
    new Date(2024, 6, 12),
    new Date(2024, 6, 20),
    // agrega más fechas aquí
  ];

  seleccionarFecha () {
    this.date = this.selected?.toLocaleDateString();
    return this.date;
  }

  dateFilter = (date: Date | null): boolean => {
    if (!date) {
      return true;
    }
    const time = date.getTime();
    return !this.disabledDates.some(d => d.getTime() === time);
  }

}
