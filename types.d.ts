export type Time = { hour: number; minute: number };

export type TimeRange = {
  start: Time;
  end: Time;
};

type Day = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

export type Calendar = Array<{
  day: Day;
  timeRange: Array<TimeRange>;
  classes: Array<string>;
}>;
