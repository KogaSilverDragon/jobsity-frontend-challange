import * as moment from "moment";
import {Reminder} from "./reminder";
import {CalendarMonth, ICalendarMonth} from "./calendar-month";

export interface ICalendar {
  monthData?: CalendarMonth;
  reminders?: Reminder[];
}

export class Calendar implements ICalendar {
  monthData: CalendarMonth;
  reminders: Reminder[] = [];

  constructor(calendar?: ICalendar) {
    let date = ((!calendar || calendar.monthData) ? moment() : moment(calendar.monthData))
    this.monthData = new CalendarMonth({ month: date.month(), year: date.year() });
  }

  goToMonth(calendarMonth: ICalendarMonth): void {
    let date = moment(calendarMonth);
    this.monthData = new CalendarMonth({ month: date.month(), year: date.year() });
  }
}

export interface CalendarStoreModel {
  reminders: Reminder[];
}
