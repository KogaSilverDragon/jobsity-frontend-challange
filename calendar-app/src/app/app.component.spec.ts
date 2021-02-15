import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {StoreModule} from "@ngrx/store";
import {calendarReducer} from "./reducers/calendar.reducer";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CalendarComponent} from "./components/calendar/calendar.component";
import {ReminderModalComponent} from "./components/reminder-modal/reminder-modal.component";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({
          reminders: calendarReducer
        }, {}),
        FormsModule,
        HttpClientModule
      ],
      declarations: [
        AppComponent,
        CalendarComponent,
        ReminderModalComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
