import {CalendarDay} from "./calendar-day";
import {Moment} from "moment";
import * as moment from "moment";

export interface ICalendarMonth {
  month: number;
  year: number;
}

export class CalendarMonth implements ICalendarMonth {
  private readonly refDate: Moment;
  month: number;
  year: number;
  weeks: CalendarDay[][];

  constructor(calendar: { month: number, year: number }) {
    this.refDate = moment(`${calendar.year}-${calendar.month + 1}-01`, 'YYYY-MM-DD');
    this.month = calendar.month;
    this.year = calendar.year;
    this.weeks = [];

    let monthDay: Moment = moment(this.refDate.toDate());
    if (monthDay.day() > 0) { monthDay = monthDay.day(0); }

    do {
      this.weeks.push([]);
      for (let i = 0; i < 7; i++) {
        this.weeks[this.weeks.length - 1].push(
          new CalendarDay({
            date: monthDay.toDate(),
            currentMonth: this.month === monthDay.month()
          })
        );
        monthDay = monthDay.day(monthDay.day() + 1);
      }
    } while (this.month === monthDay.month());
  }

  get monthName(): string { return this.refDate.format('MMMM'); }
}
