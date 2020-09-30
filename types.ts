export type Time = { hour: number; minute: number };

export enum Day {
  Sunday = 'Sunday',
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday'
}

export type TimeRange = {
  start: Time;
  end: Time;
};

export type Calendar = Array<{
  day: Day;
  timeRange: Array<TimeRange>;
  classes: Array<string>;
}>;
