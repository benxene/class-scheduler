import { describe } from '@jest/globals';
import Schedule from './index';
import { Calendar } from './types';

describe('Main suite', () => {
  let calendar: Calendar = [
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
  let schedule = new Schedule(calendar);

  it('should be array of classes', () => {
    expect(schedule.getClassTable()).toEqual([[], ['A', 'B', 'C'], ['D'], ['E'], ['F'], ['G'], []]);
  });

  it('should be 0 for the first period (9:40)', () => {
    const firstPeriodTime = new Date();
    firstPeriodTime.setFullYear(2021, 5, 28); // Monday
    firstPeriodTime.setHours(9, 40);
    expect(schedule.getPeriodNumber(firstPeriodTime)).toBe(0);
  });
});
