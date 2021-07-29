import { TimeRange, Calendar } from './types';

export class Schedule {
  private BREAK = -4;
  private NO_CLASSES = -3;
  private ENDED = -2;
  private YET_TO_START = -1;

  private FREE_BIRD = [this.NO_CLASSES, this.ENDED];

  private NO_SCHEDULE_MSG: string;
  private BREAK_MSG: string;
  private CLASSES_OVER_MSG: string;
  private YET_TO_MSG: string;

  /**
   *
   * @param calendar : Array<{ day: Day, timeRange: Array<TimeRange>, classes: Array<string>;}>
   * @param customMessages ?: { noScheduleMessage, breakMessage, classesOverMessage, yetToBeginMessage }
   */
  constructor(
    private calendar: Calendar,
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

  /**
   *
   * @param date: Date
   * @returns number corresponding to the day: number
   */
  private getDayNumber(date: Date = new Date()): number {
    // @returns 0 -> Sunday, 1-> Monday, ..., 6-> Saturday
    return date.getDay();
  }

  /**
   * Set No schedule custom message
   * @param message : String
   */
  public setNoScheduleMessage(message: string) {
    this.NO_SCHEDULE_MSG = message;
  }

  /**
   * Set Break time custom message
   * @param message : String
   */
  public setBreakMessage(message: string) {
    this.BREAK_MSG = message;
  }

  /**
   * Set all classes over custom message
   * @param message : String
   */
  public setClassesOverMessage(message: string) {
    this.CLASSES_OVER_MSG = message;
  }

  /**
   * Set classes yet to begin custom message
   * @param message : String
   */
  public setYetToStartMessage(message: string) {
    this.YET_TO_MSG = message;
  }

  /**
   * Get time table
   * @returns the time table as Array<Array<String>>
   */
  public getClassTable() {
    return this.calendar.map(value => value.classes);
  }

  /**
   * Get period number
   * @param time ?: Date | now
   * @returns period number for the given `time`
   *
   * -4 : break
   * -3 : no classes today,
   * -2 : classes have ended,
   * -1 : classes are yet to start
   */
  public getPeriodNumber(time: Date = new Date()): number {
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
        currentTime.getHours() <=
          this.calendar[dayNumber].timeRange[this.calendar[dayNumber].timeRange.length - 1].start.hour &&
        currentTime.getMinutes() <
          this.calendar[dayNumber].timeRange[this.calendar[dayNumber].timeRange.length - 1].start.minute
      ) {
        return this.BREAK;
      }
    }

    return result;
  }

  /**
   * Get Classes of a given Date/ Day number. Day number 0 corresponds to Sunday.
   * @param Date / day number
   * @returns An array of all the classes in the given day.
   */
  public getClasses(date?: Date | number): Array<string> {
    let dayNumber: number;
    if (typeof date === 'number') {
      dayNumber = date;
    } else {
      dayNumber = this.getDayNumber(date);
    }
    return this.calendar[dayNumber].classes;
  }

  /**
   * Get the Classes schedule corresponding to given days.
   * @param selectedDays
   * @returns An array of all the classes that matches the days.
   */
  public getClassByDay(...selectedDays: Array<string>) {
    return this.calendar.filter(value => {
      for (let selectedDay of selectedDays) {
        return value.day === selectedDay;
      }
    });
  }

  /**
   * Get the Class corresponding to a given period and day.
   * @param period: period number
   * @param day: Date | Day Number
   * @returns Class - String
   *
   * NOTE:
   * () -> currentPeriod
   * (n) -> today's nth period
   * (n, d) -> Day d's nth period
   */
  public getClass(period = this.getPeriodNumber(), day?: Date | number): string {
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

  /**
   * Get the current scheduled class
   * @param options: {useMeaningfulMessage: boolean : false}
   * @returns String
   */
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

  /**
   * Get the next upcoming class.
   * @param options: {allowNextDay} : Toggle next day look up - boolean
   * @returns the next class - string
   */
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

  /**
   * Get the class coming after the next class.
   * @param options: { allowNextDay } : Toggle next day look up - boolean
   * @returns The class coming after the next class - string
   */
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
