export enum ReminderColor {
  'CYAN',
  'YELLOW',
  'GREEN',
  'RED',
  'BLUE'
}

export interface IReminder {
  id?: number | null;
  name: string;
  color: ReminderColor;
  date: Date | null;
  city?: string;
  weather?: string;
}
export class Reminder implements IReminder {
  id: number | null;
  name: string;
  color: ReminderColor;
  date: Date | null;
  city: string;
  weather: string;

  constructor(reminder?: IReminder) {
    if (!reminder) {
      this.id = null;
      this.name = '';
      this.color = ReminderColor.CYAN;
      this.date = null;
      this.city = '';
      this.weather = '';
    } else {
      this.id = reminder.id || null;
      this.name = reminder.name || '';
      this.color = reminder.color || ReminderColor.CYAN;
      this.date = reminder.date;
      this.city = reminder.city || '';
      this.weather = reminder.weather || '';
    }
  }

  get isCyan(): boolean { return this.color === ReminderColor.CYAN; }
  get isBlue(): boolean { return this.color === ReminderColor.BLUE; }
  get isGreen(): boolean { return this.color === ReminderColor.GREEN; }
  get isYellow(): boolean { return this.color === ReminderColor.YELLOW; }
  get isRed(): boolean { return this.color === ReminderColor.RED; }
}
