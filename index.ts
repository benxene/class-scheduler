import { TimeRange, Calendar } from './types';

export default class Schedule {
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

  public getClassTable() {
    return this.calendar.map(value => value.classes);
  }

  public getPeriodNumber(time: Date = new Date()): number {
    /*
     * -3 : no classes today,
     * -2 : classes have ended,
     * -1 : classes are yet to start
     */

    const dayNumber = this.getDayNumber(time);
    let result = -3;
    const currentTime = new Date(time.valueOf());

    // check if the day has no classes
    if (this.calendar[dayNumber].classes.length === 0) {
      return -3;
    }

    const testTime = new Date(time.valueOf());
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
      const startTime = new Date(time.valueOf());
      startTime.setHours(start.hour, start.minute);

      const endTime = new Date(time.valueOf());
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

    if (this.calendar[dayNumber].classes.length <= period || period < 0) {
      return this.NO_SCHEDULE;
    }

    return this.calendar[dayNumber].classes[period];
  }

  public getCurrentClass(): string {
    return this.getClass();
  }

  public getNextClass({ allowNextDay }: { allowNextDay: boolean } = { allowNextDay: false }): string {
    let nextClass = this.getClass(this.getPeriodNumber() + 1);
    if (!allowNextDay) {
      return nextClass;
    }

    // if fetch from next day is allowed
    for (let nextDayCounter = 1; nextClass === this.NO_SCHEDULE; nextDayCounter++) {
      nextClass = this.getClass(0, this.getDayNumber() + nextDayCounter);
    }
    return nextClass;
  }

  public getLaterClass({ allowNextDay }: { allowNextDay: boolean } = { allowNextDay: false }): string {
    let laterClass = this.getClass(this.getPeriodNumber() + 2);
    if (!allowNextDay) {
      return laterClass;
    }

    // if fetch from next day is allowed
    let nextClass = this.getNextClass({ allowNextDay: true });
    if (nextClass === this.NO_SCHEDULE) {
      for (let nextDayCounter = 1; laterClass === this.NO_SCHEDULE; nextDayCounter++) {
        console.log({ prevClass: nextClass, nextDayCounter });
        laterClass = this.getClass(0, this.getDayNumber() + nextDayCounter);
      }
    } else {
      for (let nextDayCounter = 1; laterClass === this.NO_SCHEDULE; nextDayCounter++) {
        laterClass = this.getClass(1, this.getDayNumber() + nextDayCounter);
      }
    }

    return laterClass;
  }
}
