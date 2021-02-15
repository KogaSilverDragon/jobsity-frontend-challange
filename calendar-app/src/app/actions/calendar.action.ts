import {Action} from '@ngrx/store';
import {IReminder} from "../models/reminder";

export enum ActionTypes {
  New = 'NEW',
  Update = 'UPDATE',
  Delete = 'DELETE',
  ClearDate = 'CLEAR_DATE'
}

export const NewReminder = (reminder: IReminder) => {
  return <Action>{ type: ActionTypes.New, payload: reminder };
}

export const UpdateReminder = (reminder: IReminder) => {
  return <Action>{ type: ActionTypes.Update, payload: reminder };
}

export const DeleteReminder = (id: number) => {
  return <Action>{ type: ActionTypes.Delete, payload: id };
}

export const ClearDate = (reminders: IReminder[]) => {
  return <Action>{ type: ActionTypes.ClearDate, payload: reminders };
}
