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

type Days = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

export type TimeRange = {
  start: Time;
  end: Time;
};

export type Calendar = Array<{
  day: Day | Days;
  timeRange: Array<TimeRange>;
  classes: Array<string>;
}>;
