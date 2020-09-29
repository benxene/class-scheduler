declare type Time = { hour: number; minute: number };

declare enum Day {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday
}

declare type TimeRange = {
  start: Time;
  end: Time;
};

// Thanks to SO
type ArrayLengthMutationKeys = 'splice' | 'push' | 'pop' | 'shift' | 'unshift';
type FixedLengthArray<T, L extends number, TObj = [T, ...Array<T>]> = Pick<
  TObj,
  Exclude<keyof TObj, ArrayLengthMutationKeys>
> & {
  readonly length: L;
  [I: number]: T;
  [Symbol.iterator]: () => IterableIterator<T>;
};

declare type Calendar = FixedLengthArray<
  {
    day: Day;
    timeRange: Array<TimeRange>;
    classes: Array<string>;
  },
  7
>;
