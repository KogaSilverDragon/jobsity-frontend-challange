import {Component, OnInit, ViewChild} from '@angular/core';
import {Calendar, CalendarStoreModel} from "../../models/calendar";
import {ReminderModalComponent} from "../reminder-modal/reminder-modal.component";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {Reminder} from "../../models/reminder";
import {filter, map} from "rxjs/operators";
import * as moment from "moment";
import {ClearDate} from "../../actions/calendar.action";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  calendar!: Calendar;
  reminders$: Observable<CalendarStoreModel>;

  @ViewChild(ReminderModalComponent) modal!: ReminderModalComponent;

  constructor(private store: Store<any>) {
    this.reminders$ = store.select('reminders');
  }

  ngOnInit(): void {
    this.calendar = new Calendar();
  }

  prevMonth(): void {
    let { month, year } = this.calendar.monthData;
    year = month === 0 ? year - 1 : year;
    month = month === 0 ? 11 : month - 1;
    this.calendar.goToMonth({ month: month, year: year });
  }

  nextMonth(): void {
    let { month, year } = this.calendar.monthData;
    year = month === 11 ? year + 1 : year;
    month = month === 11 ? 0 : month + 1;
    this.calendar.goToMonth({ month: month, year: year });
  }

  getReminders(date: Date): Observable<Reminder[]> {
    return this.reminders$.pipe(map(calendar => {
      return calendar.reminders
        .filter(reminder => moment(reminder.date).isSame(date, "date"))
        .sort((a, b) => moment(a.date).diff(moment(b.date)));
    }))
  }

  newReminder(date: Date) {
    this.modal.newReminder(date);
  }

  editReminder(reminder: Reminder, event: MouseEvent) {
    event.stopPropagation();
    this.modal.editReminder(reminder);
  }

  clearDate(date: Date, event: MouseEvent) {
    event.stopPropagation();
    let reminders: Reminder[] = [];
    const sub: Subscription = this.getReminders(date)
      .subscribe(_reminders => reminders = _reminders);
    console.log(reminders);
    this.store.dispatch(ClearDate(reminders));
    sub.unsubscribe();
  }
}
