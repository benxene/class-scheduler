type Time = { hour: number, minute: number };

type TimeRange = Array<{
  start: Time,
  end: Time
}>;

type Calendar = Array<
  {
    day: string,
    timeRange: TimeRange,
    classes: Array<string>
 }
>
