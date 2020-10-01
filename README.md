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

The array must have a length of 7.

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

## Schema of the Calendar

```typescript
Array<{
  day: 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  timeRange: Array<{
    start: {
      hour: number;
      minute: number;
    };
    end: {
      hour: number;
      minute: number;
    };
  }>;
  classes: Array<string>
}>;
```

See [Quick Start Usage guide](#usage) to get a grasp of the schema.

**`NOTE`** The package is not mature enough to check if the length of the `timeRange[]` comply with the length of `classes[]` or to check if the given time limit is valid or even the size of the entire array. Please make sure that you don't do anything wrong such things before reporting a bug.

## Custom messages

Scheduler offers several options to customize the messages shown during break times, when there are no classes, when the classes are yet to start or when the all classes have ended already.

You can do that in one of the following ways:

### 1. Pass it using the constructor options parameter

```typescript
constructor(calendar: Calendar, options?: object)
```

The options object contains the following properties:

| Property           | Type   | Default            | Description                                                                  |
| ------------------ | ------ | ------------------ | ---------------------------------------------------------------------------- |
| noScheduleMessage  | string | 'No Schedule'      | No schedule for the time being, default when other messages are not provided |
| breakMessage       | string | 'Break'            | Break in-between two classes                                                 |
| classesOverMessage | string | 'Classes are over' | Classes are over for today                                                   |
| yetToBeginMessage  | string | 'Yet to begin'     | Today's classes are yet to begin                                             |

### 2. Use methods to set specific messages

| Method name           | Parameter type | Description                                                                  |
| --------------------- | -------------- | ---------------------------------------------------------------------------- |
| setNoScheduleMessage  | string         | No schedule for the time being, default when other messages are not provided |
| setBreakMessage       | string         | Break in-between two classes                                                 |
| setClassesOverMessage | string         | Classes are over for today                                                   |
| setYetToStartMessage  | string         | Today's classes are yet to begin                                             |
