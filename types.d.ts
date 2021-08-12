export declare type Time = {
  hour: number;
  minute: number;
};
export declare type TimeRange = {
  start: Time;
  end: Time;
};
declare type Day = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
export declare type Calendar = Array<{
  day: Day;
  timeRange: Array<TimeRange>;
  classes: Array<string>;
}>;
