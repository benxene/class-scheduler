export type Time = { hour: number; minute: number };

export enum Day {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday
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
