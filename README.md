# Scheduler

[![CodeFactor](https://www.codefactor.io/repository/github/bit-18-devs/scheduler/badge?s=7306cacb73574d28ce5053a222211d153e64b451&style=for-the-badge)](https://www.codefactor.io/repository/github/bit-18-devs/scheduler)

A package used for Time Table functionalities in your website.

## Installation

```sh
npm install scheduler
```

## Quick Start

### Importing

- For TypeScript

  ```typescript
  import Schedule from 'scheduler';
  ```

- For JavaScript

  - ES6+

    ```javascript
    import Schedule from 'scheduler';
    ```

  - Common JS

    ```javascript
    const { default: Schedule } = require('scheduler');
    ```

---

### Usage

#### The calendar array

Create the calendar array in the following structure for each day in a week:

```javascript
const calendar = [
  {
    day: 'Sunday',
    timeRange: [],
    classes: []
  },
  {
    day: 'Monday',
    timeRange: [
      { start: { hour: 12, minute: 30 }, end: { hour: 13, minute: 30 } },
      ...
    ],
    classes: ['Class 1', ...]
  }
  ...
];
```

The array must have a length of 7. The length of timeRange must be equal to the length of classes.

#### Initialize the Schedule object

```javascript
const sch = new Schedule(calendar);
```

#### Get current class

```javascript
const currentClass = sch.getCurrentClass();
```

#### Get upcoming classes

```javascript
const nextClass = sch.getNextClass();
const laterClass = sch.getLaterClass();
```
