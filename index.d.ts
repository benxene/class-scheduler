declare type Time = { hour: number, minute: number };

declare enum Day { Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday }

declare type TimeRange = {
  start: Time,
  end: Time
};

declare type Calendar = Array<
  {
    day: Day,
    timeRange: Array<TimeRange>,
    classes: Array<string>
 }
>
