const { default: Schedule } = require('./index');

const calendar = [
  { day: 0, timeRange: [], classes: [] },
  {
    day: 1,
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
    day: 2,
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
    day: 3,
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
    day: 4,
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
    day: 5,
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
    day: 6,
    timeRange: [],
    classes: []
  }
];

const sch = new Schedule(calendar);

console.table({
  'Current period no.': sch.getPeriodNumber(),
  'Current period': sch.getCurrentClass(),
  'Next w/o next day': sch.getNextClass(false),
  'Later w/o next day': sch.getLaterClass(false),
  'Next w/ next day': sch.getNextClass(true),
  'Later w/ next day': sch.getLaterClass(true)
});
