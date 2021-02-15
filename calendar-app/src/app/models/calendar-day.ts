export interface ICalendarDay {
  date: Date;
  currentMonth: boolean;
}

export class CalendarDay implements ICalendarDay{
  date: Date;
  currentMonth: boolean;

  constructor(calendarDay: ICalendarDay) {
    this.date = calendarDay.date;
    this.currentMonth = calendarDay.currentMonth;
  }
}
