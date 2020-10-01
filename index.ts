import { TimeRange, Calendar } from './types';

export default class Schedule {
  private calendar: Calendar;
  private BREAK: number = -4;
  private NO_CLASSES: number = -3;
  private ENDED: number = -2;
  private YET_TO_START = -1;

  private FREE_BIRD = [this.NO_CLASSES, this.ENDED];

  private NO_SCHEDULE_MSG: string;
  private BREAK_MSG: string;
  private CLASSES_OVER_MSG: string;
  private YET_TO_MSG: string;

  constructor(
    calendar: Calendar,
    { noScheduleMessage, breakMessage, classesOverMessage, yetToBeginMessage } = {
      noScheduleMessage: 'No Schedule',
      breakMessage: 'Break',
      classesOverMessage: 'Classes are over',
      yetToBeginMessage: 'Yet to begin'
    }
  ) {
    this.calendar = calendar;
    this.NO_SCHEDULE_MSG = noScheduleMessage;
    this.BREAK_MSG = breakMessage;
    this.CLASSES_OVER_MSG = classesOverMessage;
    this.YET_TO_MSG = yetToBeginMessage;
  }

  private getDayNumber(date: Date = new Date()): number {
    // @returns 0 -> Sunday, 1-> Monday, ..., 6-> Saturday
    return date.getDay();
  }

  public setNoScheduleMessage(message: string) {
    this.NO_SCHEDULE_MSG = message;
  }
  public setBreakMessage(message: string) {
    this.BREAK_MSG = message;
  }
  public setClassesOverMessage(message: string) {
    this.CLASSES_OVER_MSG = message;
  }
  public setYetToStartMessage(message: string) {
    this.YET_TO_MSG = message;
  }

  public getClassTable() {
    return this.calendar.map(value => value.classes);
  }

  public getPeriodNumber(time: Date = new Date()): number {
    /*
     * -4 : break
     * -3 : no classes today,
     * -2 : classes have ended,
     * -1 : classes are yet to start
     */

    const dayNumber = this.getDayNumber(time);
    let result = this.NO_CLASSES;
    const currentTime = new Date(time.valueOf());

    // check if the day has no classes
    if (this.calendar[dayNumber].classes.length === 0) {
      return result;
    }

    const testTime = new Date(time.valueOf());
    const start = this.calendar[dayNumber].timeRange[0].start;
    const end = this.calendar[dayNumber].timeRange[this.calendar[dayNumber].timeRange.length - 1].end;

    // check if the classes are yet to start
    testTime.setHours(start.hour, start.minute);

    if (currentTime.getTime() < testTime.getTime()) {
      return this.YET_TO_START;
    }

    // check if the classes have ended
    testTime.setHours(end.hour, end.minute);
    if (currentTime.getTime() > testTime.getTime()) {
      return this.ENDED;
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

    if (result === this.NO_CLASSES) {
      // check if its a break
      if (
        this.calendar[dayNumber].timeRange[0].start.hour < currentTime.getHours() &&
        currentTime.getHours() <
          this.calendar[dayNumber].timeRange[this.calendar[dayNumber].timeRange.length - 1].start.hour
      ) {
        return this.BREAK;
      }
    }

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

  public getClassByDay(...day: Array<string>) {
    return this.calendar.filter(value => {
      let i: number;
      for (i = 0; i < day.length; i++) {
        if (value.day === day[i]) {
          return true;
        }
      }
    });
  }

  public getClass(period = this.getPeriodNumber(), day?: Date | number): string {
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

    if (!this.calendar[dayNumber] || this.calendar[dayNumber].classes.length <= period || period < 0) {
      return this.NO_SCHEDULE_MSG;
    }

    return this.calendar[dayNumber].classes[period];
  }

  public getCurrentClass({ useMeaningfulMessage } = { useMeaningfulMessage: false }): string {
    let currentClass = this.getClass();

    if (useMeaningfulMessage && currentClass === this.NO_SCHEDULE_MSG) {
      switch (this.getPeriodNumber()) {
        case this.BREAK:
          currentClass = this.BREAK_MSG;
          break;
        case this.ENDED:
          currentClass = this.CLASSES_OVER_MSG;
          break;
        case this.YET_TO_START:
          currentClass = this.YET_TO_MSG;
      }
    }

    return currentClass;
  }

  public getNextClass({ allowNextDay } = { allowNextDay: false }): string {
    const currentPeriodNumber = this.getPeriodNumber();

    let nextClass;
    if (this.FREE_BIRD.indexOf(currentPeriodNumber) >= 0) {
      nextClass = this.NO_SCHEDULE_MSG;
    } else {
      nextClass = this.getClass(this.getPeriodNumber() + 1);
    }
    if (!allowNextDay) {
      return nextClass;
    }

    // if fetch from next day is allowed
    nextClass = this.getClass(this.getPeriodNumber() + 1);
    for (let nextDayCounter = 1; nextClass === this.NO_SCHEDULE_MSG; nextDayCounter++) {
      let newDay = this.getDayNumber() + nextDayCounter;
      if (newDay > 6) {
        nextDayCounter = -6;
      }
      nextClass = this.getClass(0, newDay);
    }
    return nextClass;
  }

  public getLaterClass({ allowNextDay } = { allowNextDay: false }): string {
    const currentPeriodNumber = this.getPeriodNumber();

    let laterClass;

    if (this.FREE_BIRD.indexOf(currentPeriodNumber) >= 0) {
      laterClass = this.NO_SCHEDULE_MSG;
    } else {
      laterClass = this.getClass(currentPeriodNumber + 2);
    }

    if (!allowNextDay) {
      return laterClass;
    }

    // if fetch from next day is allowed
    let nextClass = this.getNextClass({ allowNextDay: false });
    if (nextClass === this.NO_SCHEDULE_MSG) {
      for (let nextDayCounter = 1; laterClass === this.NO_SCHEDULE_MSG; nextDayCounter++) {
        let newDay = this.getDayNumber() + nextDayCounter;
        if (newDay > 6) {
          nextDayCounter = -6;
        }
        laterClass = this.getClass(1, newDay);
      }
    } else {
      for (let nextDayCounter = 1; laterClass === this.NO_SCHEDULE_MSG; nextDayCounter++) {
        let newDay = this.getDayNumber() + nextDayCounter;
        if (newDay > 6) {
          nextDayCounter = -6;
        }
        laterClass = this.getClass(0, newDay);
      }
    }

    return laterClass;
  }
}
