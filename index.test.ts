import { describe } from '@jest/globals';
import { Schedule } from './index';
import { Calendar } from './types';

const calendar: Calendar = [
  { day: 'Sunday', timeRange: [], classes: [] },
  {
    day: 'Monday',
    timeRange: [
      { start: { hour: 9, minute: 30 }, end: { hour: 10, minute: 30 } },
      { start: { hour: 11, minute: 30 }, end: { hour: 12, minute: 30 } },
      { start: { hour: 13, minute: 30 }, end: { hour: 14, minute: 30 } }
    ],
    classes: ['A', 'B', 'C']
  },
  {
    day: 'Tuesday',
    timeRange: [{ start: { hour: 9, minute: 30 }, end: { hour: 10, minute: 30 } }],
    classes: ['D']
  },
  {
    day: 'Wednesday',
    timeRange: [{ start: { hour: 9, minute: 30 }, end: { hour: 10, minute: 30 } }],
    classes: ['E']
  },
  {
    day: 'Thursday',
    timeRange: [{ start: { hour: 9, minute: 30 }, end: { hour: 10, minute: 30 } }],
    classes: ['F']
  },
  {
    day: 'Friday',
    timeRange: [{ start: { hour: 9, minute: 30 }, end: { hour: 10, minute: 30 } }],
    classes: ['G']
  },
  { day: 'Saturday', timeRange: [], classes: [] }
];

const schedule = new Schedule(calendar);

describe('Main suite', () => {
  it('should be array of classes', () => {
    expect(schedule.getClassTable()).toEqual([[], ['A', 'B', 'C'], ['D'], ['E'], ['F'], ['G'], []]);
  });
});

describe('Get Period number', () => {
  it('should return a number for any time', () => {
    expect(typeof schedule.getPeriodNumber()).toBe(typeof 1);
  });

  it('should return 0 for the first period (9:40)', () => {
    const firstPeriodTime = new Date();
    firstPeriodTime.setFullYear(2021, 5, 28); // Monday
    firstPeriodTime.setHours(9, 40);
    expect(schedule.getPeriodNumber(firstPeriodTime)).toBe(0);
  });

  it('should return 2 for the 3rd period (13:40)', () => {
    const lastHour = new Date();
    lastHour.setFullYear(2021, 5, 28);
    lastHour.setHours(13, 40);
    expect(schedule.getPeriodNumber(lastHour)).toBe(2);
  });

  it('should return -4 (break) on Monday 13:00', () => {
    const breakTime = new Date();
    breakTime.setFullYear(2021, 5, 28);
    breakTime.setHours(13, 0);
    expect(schedule.getPeriodNumber(breakTime)).toBe(-4);
  });

  it('should return -3 (no classes) on Sunday', () => {
    const sunday = new Date();
    sunday.setFullYear(2021, 5, 27);
    sunday.setHours(9, 30);
    expect(schedule.getPeriodNumber(sunday)).toBe(-3);
  });

  it('should return -2 (ended) at evening', () => {
    const evening = new Date();
    evening.setFullYear(2021, 5, 28);
    evening.setHours(18, 30);
    expect(schedule.getPeriodNumber(evening)).toBe(-2);
  });

  it('should return -1 (yet to start) on early morning', () => {
    const earlyMorning = new Date();
    earlyMorning.setFullYear(2021, 5, 28);
    earlyMorning.setHours(7, 30);
    expect(schedule.getPeriodNumber(earlyMorning)).toBe(-1);
  });
});

describe('Get Classes', () => {
  it('should return an array', () => {
    expect(Array.isArray(schedule.getClasses())).toBe(true);
  });

  it('should return ["A", "B", "C"] for Day 1', () => {
    expect(schedule.getClasses(1)).toEqual(['A', 'B', 'C']);
  });

  it('should return ["D"] for Tuesday (Date)', () => {
    const tuesday = new Date();
    tuesday.setFullYear(2021, 5, 29);
    expect(schedule.getClasses(tuesday)).toEqual(['D']);
  });
});

describe('Get Class', () => {
  it('should return a string', () => {
    expect(typeof schedule.getClass()).toBe(typeof 'a');
  });

  it('should be "G" for Day #5 1st period', () => {
    expect(schedule.getClass(0, 5)).toBe('G');
  });

  it('should be "B" for Monday 2nd period', () => {
    const mon2nd = new Date();
    mon2nd.setFullYear(2021, 5, 28);
    expect(schedule.getClass(1, mon2nd)).toBe('B');
  });
});

describe('Get Class by Day', () => {
  it('should return an array', () => {
    expect(Array.isArray(schedule.getClassByDay('Sunday'))).toBe(true);
  });

  it('should return an array of objects with properties: day, timeRange and classes', () => {
    const sundayTTObj = schedule.getClassByDay('Sunday')[0];
    expect(sundayTTObj).toHaveProperty('day', 'Sunday');
    expect(sundayTTObj).toHaveProperty('timeRange');
    expect(sundayTTObj).toHaveProperty('classes');
  });
});

describe('Get Current Class', () => {
  it('should return a string', () => {
    expect(typeof schedule.getCurrentClass()).toBe(typeof 'String');
  });
});

describe('Get Next class', () => {
  it('should return a string', () => {
    expect(typeof schedule.getNextClass()).toBe(typeof 'String');
  });
});

describe('Get Later class', () => {
  it('should return a string', () => {
    expect(typeof schedule.getLaterClass()).toBe(typeof 'String');
  });
});
