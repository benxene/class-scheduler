class Schedule {
  private calendar: Calendar;
  private NO_SCHEDULE: string;

  constructor(calendar: Calendar, noScheduleMessage: string = 'No Schedule') {
    this.calendar = calendar;
    this.NO_SCHEDULE = noScheduleMessage;
  }

  private getDayNumber(date: Date = new Date()): number {
    // @returns 0 -> Sunday, 1-> Monday, ..., 6-> Saturday
    return date.getDay();
  }

  public setNoScheduleMessage(message: string) {
    this.NO_SCHEDULE = message;
  }

  public getPeriodNumber(time: Date = new Date()): number {
    /*
     * -3 : no classes today,
     * -2 : classes have ended,
     * -1 : classes are yet to start
     */

    const dayNumber = this.getDayNumber(time);
    let result = -3;
    const currentTime = new Date(time);

    // check if the day has no classes
    if (this.calendar[dayNumber].classes.length === 0) {
      return -3;
    }

    const testTime = new Date(time);
    const start = this.calendar[dayNumber].timeRange[0].start;
    const end = this.calendar[dayNumber].timeRange[this.calendar[dayNumber].timeRange.length - 1].end;

    // check if the classes are yet to start
    testTime.setHours(start.hour, start.minute);

    if (currentTime.getTime() < testTime.getTime()) {
      return -1;
    }

    // check if the classes have ended
    testTime.setHours(end.hour, end.minute);
    if (currentTime.getTime() > testTime.getTime()) {
      return -2;
    }

    // Check with current time
    this.calendar[dayNumber].timeRange.forEach(({ start, end }: TimeRange, index: number) => {
      const startTime = new Date(time);
      startTime.setHours(start.hour, start.minute);

      const endTime = new Date(time);
      endTime.setHours(end.hour, end.minute);

      if (startTime.getTime() <= currentTime.getTime() && currentTime.getTime() <= endTime.getTime()) {
        result = index;
      }
    });

    return result;
  }

  public getClasses(date?: Date | number): Array<string> {
    let dayNumber: number;
    if (typeof date === 'number') {
      dayNumber = date;
    } else {
      dayNumber = this.getDayNumber(date);
    }
    return this.calendar[dayNumber].classes;
  }

  public getClass(period: number = this.getPeriodNumber(), day?: Date | number): string {
    /*
     * () -> currentPeriod
     * (n) -> today's nth period
     * (n, d) -> Day d's nth period
     */
    let dayNumber: number;

    if (typeof day === 'number') {
      dayNumber = day;
    } else {
      dayNumber = this.getDayNumber(day);
    }

    if (this.calendar[dayNumber].classes.length < period || period < 0) {
      return this.NO_SCHEDULE;
    }

    return this.calendar[dayNumber].classes[period];
  }

  public getCurrentClass(): string {
    return this.getClass();
  }

  public getNextClass(): string {
    return this.getClass(this.getPeriodNumber() + 1);
  }

  public getLaterClass(): string {
    return this.getClass(this.getPeriodNumber() + 2);
  }
}

const calendar: Calendar = [
  { day: Day.Sunday, timeRange: [], classes: [] },
  {
    day: Day.Monday,
    timeRange: [
      { start: { hour: 9, minute: 30 }, end: { hour: 10, minute: 30 } },
      { start: { hour: 10, minute: 45 }, end: { hour: 11, minute: 45 } },
      { start: { hour: 12, minute: 0 }, end: { hour: 13, minute: 0 } },
      { start: { hour: 14, minute: 15 }, end: { hour: 15, minute: 50 } },
      { start: { hour: 15, minute: 30 }, end: { hour: 16, minute: 30 } }
    ],
    classes: ['A', 'B', 'C', 'D', 'E']
  },
  {
    day: Day.Tuesday,
    timeRange: [
      { start: { hour: 9, minute: 30 }, end: { hour: 10, minute: 30 } },
      { start: { hour: 10, minute: 45 }, end: { hour: 11, minute: 45 } },
      { start: { hour: 12, minute: 0 }, end: { hour: 13, minute: 0 } },
      { start: { hour: 14, minute: 15 }, end: { hour: 15, minute: 50 } },
      { start: { hour: 15, minute: 30 }, end: { hour: 16, minute: 30 } }
    ],
    classes: ['A', 'B', 'C', 'D', 'E']
  },
  {
    day: Day.Wednesday,
    timeRange: [
      { start: { hour: 9, minute: 30 }, end: { hour: 10, minute: 30 } },
      { start: { hour: 10, minute: 45 }, end: { hour: 11, minute: 45 } },
      { start: { hour: 12, minute: 0 }, end: { hour: 13, minute: 0 } },
      { start: { hour: 14, minute: 15 }, end: { hour: 15, minute: 50 } },
      { start: { hour: 15, minute: 30 }, end: { hour: 16, minute: 30 } }
    ],
    classes: ['A', 'B', 'C', 'D', 'E']
  },
  {
    day: Day.Thursday,
    timeRange: [
      { start: { hour: 9, minute: 30 }, end: { hour: 10, minute: 30 } },
      { start: { hour: 10, minute: 45 }, end: { hour: 11, minute: 45 } },
      { start: { hour: 12, minute: 0 }, end: { hour: 13, minute: 0 } },
      { start: { hour: 14, minute: 15 }, end: { hour: 15, minute: 50 } },
      { start: { hour: 15, minute: 30 }, end: { hour: 16, minute: 30 } }
    ],
    classes: ['A', 'B', 'C', 'D', 'E']
  },
  {
    day: Day.Friday,
    timeRange: [
      { start: { hour: 9, minute: 30 }, end: { hour: 10, minute: 30 } },
      { start: { hour: 10, minute: 45 }, end: { hour: 11, minute: 45 } },
      { start: { hour: 12, minute: 0 }, end: { hour: 13, minute: 0 } },
      { start: { hour: 14, minute: 15 }, end: { hour: 15, minute: 50 } },
      { start: { hour: 15, minute: 30 }, end: { hour: 16, minute: 30 } }
    ],
    classes: ['A', 'B', 'C', 'D', 'E']
  },
  {
    day: Day.Saturday,
    timeRange: [],
    classes: []
  }
];

const sch = new Schedule(calendar);
const testingDate = new Date();
testingDate.setHours(19, 45);
const currentP = sch.getPeriodNumber(testingDate);
console.log(sch.getClass(currentP));

export default Schedule;

/*
getDayNumber()
getClasses()
getPeriodNumber()
getClass()
getCurrentClass()
getNextClass()
getLaterClass()
*/
