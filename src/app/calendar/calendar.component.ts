import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent {

  @Input() idFacility?: string;

  selected: Date | null = null;
  date: any;

  availableDates: Date[] = [
    new Date(2024, 6, 3),
    new Date(2024, 6, 12),
    new Date(2024, 6, 20),
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
    return this.availableDates.some(d => d.getTime() === time);
  }

}
