class Schedule {
  private calendar: Calendar;

  constructor(calendar: Calendar) {
    this.calendar = calendar;
  }

  private getDayNumber(date: Date = new Date()): number {
    // @returns 0 -> Sunday, 1-> Monday, ..., 6-> Saturday
    return date.getDay();
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
    testTime.setHours(start.hour);
    testTime.setMinutes(start.minute);

    if (currentTime.getTime() < testTime.getTime()) {
      return -1;
    }

    // check if the classes have ended
    testTime.setHours(end.hour);
    testTime.setMinutes(end.minute);
    if (currentTime.getTime() > testTime.getTime()) {
      return -2;
    }

    // Check with current time
    this.calendar[dayNumber].timeRange.forEach(({ start, end }: any, index: number) => {
      const startTime = new Date(time);
      startTime.setHours(start.hour);
      startTime.setMinutes(start.minute);

      const endTime = new Date(time);
      endTime.setHours(end.hour);
      endTime.setMinutes(end.minute);

      if (startTime.getTime() <= currentTime.getTime() && endTime.getTime() >= currentTime.getTime()) {
        result = index;
      }
    });

    return result;
  }

  public getClass(period: number = this.getPeriodNumber(), date?: Date | number): string {
    /*
     * () -> currentPeriod
     * (n) -> today's nth period
     * (n, d) -> Day d's nth period
     */
    let dayNumber: number;

    if (typeof date === 'number') {
      dayNumber = date;
    } else {
      dayNumber = this.getDayNumber(date);
    }

    if (this.calendar[dayNumber].classes.length < period || period < 0) {
      return 'No Schedule';
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

const calendar = [
  { day: 'Sunday', timeRange: [], classes: [] },
  {
    day: 'Monday',
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
    day: 'Tuesday',
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
    day: 'Wednesday',
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
    day: 'Thursday',
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
    day: 'Friday',
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
    day: 'Saturday',
    timeRange: [],
    classes: []
  }
];

const sch = new Schedule(calendar);
const testingDate = new Date();
testingDate.setHours(19);
testingDate.setMinutes(45);
const currentP = sch.getPeriodNumber(testingDate);
console.log(sch.getClass(currentP));

/*
getDayNumber()
getClasses()
getPeriodNumber()
getClass()
getCurrentClass()
getNextClass()
getLaterClass()
*/
