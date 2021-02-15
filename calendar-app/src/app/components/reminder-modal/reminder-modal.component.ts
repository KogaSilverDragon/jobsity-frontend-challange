import {Component, OnInit} from '@angular/core';
import {Reminder, ReminderColor} from "../../models/reminder";
import {Store} from '@ngrx/store'
import {Calendar} from "../../models/calendar";
import * as moment from "moment";
import {DeleteReminder, NewReminder, UpdateReminder} from "../../actions/calendar.action";
import {WeatherService} from "../../services/weather.service";

@Component({
  selector: 'app-reminder-modal',
  templateUrl: './reminder-modal.component.html',
  styleUrls: ['./reminder-modal.component.scss']
})
export class ReminderModalComponent implements OnInit {
  private _isOpen: boolean = false;
  get isOpen() { return this._isOpen; }


  id: number | null = null;
  color: ReminderColor = ReminderColor.CYAN;
  private date: Date | null = null;
  get day(): string { return this.date ? moment(this.date).format('YYYY-MM-DD') : ''; }
  set day(value) { this.date = moment(value).toDate(); }
  get time(): string { return this.date ? moment(this.date).format('HH:mm') : ''; }
  set time(value) {
    let date = moment(this.date);
    date.hour(parseInt(value.split(':')[0], 10));
    date.minute(parseInt(value.split(':')[1], 10));
    this.date = date.toDate();
  }

  name: string = '';
  city: string = '';

  constructor(private store: Store<Calendar>,
              private weatherService: WeatherService) {}

  ngOnInit(): void { }

  private reset(): void {
    this.id = null;
    this.name = '';
    this.color = ReminderColor.CYAN;
    this.date = null;
    this.city = '';
  }

  canSubmit(): boolean { return !!this.name && this.date != null; }

  newReminder(date?: Date): void {
    this.date = date || null;
    this._isOpen = true;
  }

  editReminder(reminder: Reminder): void {
    this.id = reminder.id;
    this.name = reminder.name;
    this.color = reminder.color;
    this.date = reminder.date;
    this.city = reminder.city;
    this._isOpen = true;
  }

  delete(): void {
    if (!this.id) { return; }
    this.store.dispatch(DeleteReminder(this.id!));
    this._isOpen = false;
    this.reset();
  }

  cancel(): void {
    this._isOpen = false;
    this.reset();
  }

  async confirm(): Promise<void> {
    const weather: string = this.city ? await this.weatherService.getCityWeather(this.city).toPromise() : '';
    const payload = {
      id: this.id,
      name: this.name,
      color: this.color,
      date: this.date,
      city: this.city,
      weather: weather
    };

    this.store.dispatch(this.id ? UpdateReminder(payload) : NewReminder(payload));
    this._isOpen = false;
    this.reset();
  }
}
