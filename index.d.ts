import { TimeRange, Calendar } from './types';
export declare class Schedule {
  private readonly calendar;
  private readonly BREAK;
  private readonly NO_CLASSES;
  private readonly ENDED;
  private readonly YET_TO_START;
  private readonly FREE_BIRD;
  private NO_SCHEDULE_MSG;
  private BREAK_MSG;
  private CLASSES_OVER_MSG;
  private YET_TO_MSG;
  constructor(
    calendar: Calendar,
    {
      noScheduleMessage,
      breakMessage,
      classesOverMessage,
      yetToBeginMessage
    }?: {
      noScheduleMessage: string;
      breakMessage: string;
      classesOverMessage: string;
      yetToBeginMessage: string;
    }
  );
  /**
   * @returns number corresponding to the day: number
   */
  private getDayNumber;
  /**
   * Set No schedule custom message
   */
  setNoScheduleMessage(message: string): void;
  /**
   * Set Break time custom message
   */
  setBreakMessage(message: string): void;
  /**
   * Set all classes over custom message
   */
  setClassesOverMessage(message: string): void;
  /**
   * Set classes yet to begin custom message
   */
  setYetToStartMessage(message: string): void;
  /**
   * Get time table
   */
  getClassTable(): Array<Array<string>>;
  /**
   * Get period number
   * @returns period number for the given `time`
   *
   * -4 : break
   * -3 : no classes today,
   * -2 : classes have ended,
   * -1 : classes are yet to start
   */
  getPeriodNumber(time?: Date): number;
  /**
   * Get Classes of a given Date/ Day number. Day number 0 corresponds to Sunday.
   * @returns An array of all the classes in the given day.
   */
  getClasses(date?: Date | number): Array<string>;
  /**
   * Get the Classes schedule corresponding to given days.
   * @returns An array of all the classes that matches the days.
   */
  getClassByDay(...selectedDays: Array<string>): {
    day: 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
    timeRange: TimeRange[];
    classes: string[];
  }[];
  /**
   * Get the Class corresponding to a given period and day.
   *
   * NOTE:
   * () -> currentPeriod
   * (n) -> today's nth period
   * (n, d) -> Day d's nth period
   */
  getClass(period?: number, day?: Date | number): string;
  /**
   * Get the current scheduled class
   */
  getCurrentClass({ useMeaningfulMessage }?: { useMeaningfulMessage: boolean }): string;
  /**
   * Get the next upcoming class.
   */
  getNextClass({ allowNextDay }?: { allowNextDay: boolean }): string;
  /**
   * Get the class coming after the next class.
   */
  getLaterClass({ allowNextDay }?: { allowNextDay: boolean }): string;
}
