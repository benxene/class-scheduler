type Time = { hour: number, minute: number };

type TimeRange = {
  start: Time,
  end: Time
};

type Calendar = Array<
  {
    day: string,
    timeRange: Array<TimeRange>,
    classes: Array<string>
 }
>
