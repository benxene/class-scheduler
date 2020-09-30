<h1 align="center">
 📅 Scheduler
</h1>

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Windows Build][appveyor-image]][appveyor-url]
[![Test Coverage][coveralls-image]][coveralls-url]

A package used for Time Table functionalities in your website.

# Installation

```sh
#Locally on your project

npm install scheduler
```

# Usage

> Import it in your code by ES6 version.

```javascript
import { Schedule } from 'scheduler';
```

> Getting Started:

```javascript
const sch = new Schedule(calendar);
```

> Create the calendar object in the follwing structure for each day in a week:

```javascript
const calendar: Calendar = [
  {
    day: 'Day',
    timeRange: [
      {
        start: { hour: 'hour', minute: 'minute' },
        end: { hour: 'hour', minute: 'minute' }
      }
    ],
    classes: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5']
  }
];
```


<!-- > getDayNumber()<br /><br />
> getClasses()<br/><br />
> getPeriodNumber()<br /><br />
> getClass()<br /><br />
> getCurrentClass()<br /><br />
> getNextClass()<br /><br />
> getLaterClass()
const { default: Schedule } = require('./index');
const { Day } = require('./types');

const calendar = [
  { day: Day.Sunday, timeRange: [], classes: [] },
  {
    day: 'Monday',
    timeRange: [
      { start: { hour: 9, minute: 30 }, end: { hour: 10, minute: 30 } },
      { start: { hour: 10, minute: 45 }, end: { hour: 11, minute: 45 } },
      { start: { hour: 12, minute: 0 }, end: { hour: 13, minute: 0 } },
      { start: { hour: 14, minute: 15 }, end: { hour: 15, minute: 15 } },
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
      { start: { hour: 14, minute: 15 }, end: { hour: 15, minute: 15 } },
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
      { start: { hour: 14, minute: 15 }, end: { hour: 15, minute: 15 } },
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
      { start: { hour: 14, minute: 15 }, end: { hour: 15, minute: 15 } },
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
      { start: { hour: 14, minute: 15 }, end: { hour: 15, minute: 15 } },
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

console.log(sch.getClassTable());

console.table({
  'Current period no.': sch.getPeriodNumber(),
  'Current period': sch.getCurrentClass({ useMeaningfulMessage: true }),
  'Next w/o next day': sch.getNextClass(),
  'Later w/o next day': sch.getLaterClass(),
  'Next w/ next day': sch.getNextClass({ allowNextDay: true }),
  'Later w/ next day': sch.getLaterClass({ allowNextDay: true })
});
 -->

[npm-image]: https://img.shields.io/npm/v/express.svg
[npm-url]: https://npmjs.org/package/express
[downloads-image]: https://img.shields.io/npm/dm/express.svg
[downloads-url]: https://npmcharts.com/compare/express?minimal=true
[travis-image]: https://img.shields.io/travis/expressjs/express/master.svg?label=linux
[travis-url]: https://travis-ci.org/expressjs/express
[appveyor-image]: https://img.shields.io/appveyor/ci/dougwilson/express/master.svg?label=windows
[appveyor-url]: https://ci.appveyor.com/project/dougwilson/express
[coveralls-image]: https://img.shields.io/coveralls/expressjs/express/master.svg
[coveralls-url]: https://coveralls.io/r/expressjs/express?branch=master
