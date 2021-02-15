import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CalendarComponent} from './calendar.component';
import {RouterTestingModule} from "@angular/router/testing";
import {StoreModule} from "@ngrx/store";
import {calendarReducer} from "../../reducers/calendar.reducer";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AppComponent} from "../../app.component";
import {ReminderModalComponent} from "../reminder-modal/reminder-modal.component";
import {Reminder, ReminderColor} from "../../models/reminder";
import * as moment from "moment";
import {Subscription} from "rxjs";
import {Moment} from "moment";

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

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
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new reminder', async () => {
    const date: Moment = moment('2021-02-01 12:20', 'YYYY-MM-DD HH:mm');
    let reminders: Reminder[] = [];
    const reminderSub: Subscription = component.getReminders(date.toDate())
      .subscribe(_reminders => reminders = _reminders);
    component.newReminder(date.toDate());
    expect(component.modal.isOpen).toBeTruthy();

    component.modal.name = 'New Reminder';
    component.modal.color = ReminderColor.GREEN;
    component.modal.day = moment(date).format('MM-DD-YYYY');
    component.modal.time = moment(date).format('HH:mm');
    component.modal.city = 'New York';
    await component.modal.confirm();
    expect(component.modal.isOpen).toBeFalsy();

    expect(reminders.length).toBe(1);
    expect(reminders.length).not.toBe(2);
    expect(reminders.length).not.toBe(0);
    expect(reminders[0].id).toBeDefined();
    expect(reminders[0].name).toBe('New Reminder');
    expect(reminders[0].color).toBe(ReminderColor.GREEN);
    expect(reminders[0].date).toEqual(date.toDate());
    expect(reminders[0].city).toBe('New York');
    expect(reminders[0].weather).toBeDefined();
    reminderSub.unsubscribe();
  });
});
