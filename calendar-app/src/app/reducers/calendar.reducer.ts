import {ActionTypes} from '../actions/calendar.action';
import {Reminder} from "../models/reminder";
import {CalendarStoreModel} from "../models/calendar";
import * as moment from "moment";
import {ActionModel} from "../models/action.model";

export const initialState: CalendarStoreModel = { reminders: [] };

export function calendarReducer(state = initialState, action: ActionModel): CalendarStoreModel {
  switch (action.type) {
    case ActionTypes.New: {
      let newReminder = new Reminder(action.payload);
      newReminder.id = moment().unix();
      let newState = { ...state, reminders: [...state.reminders, newReminder] };

      return newState;
    }

    case ActionTypes.Update: {
      const index = state.reminders.findIndex(reminder => reminder.id === action.payload.id);
      if (index !== -1) {
        let reminders = [...state.reminders];
        reminders.splice(index, 1, new Reminder(action.payload));

        return { ...state, reminders: reminders };
      } else {
        return { ...state };
      }
    }

    case ActionTypes.Delete: {
      const index = state.reminders.findIndex(reminder => reminder.id === action.payload);
      if (index !== -1) {
        let reminders = [...state.reminders];
        reminders.splice(index, 1);

        return { ...state, reminders: reminders };
      } else {
        return { ...state };
      }
    }

    case ActionTypes.ClearDate: {
      let reminders: Reminder[] = [...state.reminders]
        .filter(reminder => action.payload.every((_reminder: Reminder) => _reminder.id !== reminder.id));

      return { ...state, reminders: reminders };
    }

    default:
      return { ...state };
  }
}
