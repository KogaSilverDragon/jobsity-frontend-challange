import { TestBed } from '@angular/core/testing';

import { WeatherService } from './weather.service';
import {RouterTestingModule} from "@angular/router/testing";
import {StoreModule} from "@ngrx/store";
import {calendarReducer} from "../reducers/calendar.reducer";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AppComponent} from "../app.component";
import {CalendarComponent} from "../components/calendar/calendar.component";
import {ReminderModalComponent} from "../components/reminder-modal/reminder-modal.component";

describe('WeatherService', () => {
  let service: WeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(WeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
