<p align="center">
 <img src="https://raw.githubusercontent.com/benxene/blobs/main/schedule.png" align="center" alt="logo" width="100px" />
 <h1 align="center">Class Scheduler</h1>
</p>

<p align="center">
<a href="https://www.codefactor.io/repository/github/bit-18-devs/scheduler">
<img src="https://www.codefactor.io/repository/github/bit-18-devs/scheduler/badge?s=7306cacb73574d28ce5053a222211d153e64b451&style=for-the-badge" align="center" alt="codefactor" /></a>
<a href="https://www.npmjs.com/package/class-scheduler">
<img alt="npm" src="https://img.shields.io/npm/v/class-scheduler?color=%23CC3534&style=for-the-badge" align="center" />
</a>
<a href="https://www.npmjs.com/package/class-scheduler">
<img alt="npm bundle size" align="center" src="https://img.shields.io/bundlephobia/minzip/class-scheduler?color=%2310BE41&style=for-the-badge">
</a>
</p>

<p align="center">A zero dependency class schedule manager.</p>

## Installation

```sh
npm install class-scheduler
```

## Quick Start

### Importing

- For TypeScript

  ```typescript
  import Schedule from 'class-scheduler';
  ```

- For JavaScript

  - ES6+

    ```javascript
    import Schedule from 'class-scheduler';
    ```

  - Common JS

    ```javascript
    const { default: Schedule } = require('class-scheduler');
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

---

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

---

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

---

## Methods

### getClassTable

Arguments: None

#### Returns

All the classes of the week as array of array.

Type: `Array<Array<string>>`

---

### getPeriodNumber

Get Period number corresponding to a given time.

#### Arguments

| Name | Type | isMandatory | Default      |
| ---- | ---- | ----------- | ------------ |
| time | Date | false       | current time |

#### Returns

The period number corresponding to the given time. 0 corresponds to 1st period of the day.

Type: `number`

##### Special values

| Value | Meaning                  |
| ----- | ------------------------ |
| -4    | Break                    |
| -3    | No classes today         |
| -2    | Classes have ended       |
| -1    | Classes are yet to start |

---

### getClasses

Get Classes of a given Date/ Day number. Day number 0 corresponds to Sunday.

#### Arguments

| Name | Type          | isMandatory | Default      |
| ---- | ------------- | ----------- | ------------ |
| date | Date / number | false       | current date |

#### Returns

An array of all the classes in the given day.

Type: `Array<string>`

---

### getClass

Get the Class corresponding to a given period and day.

#### Arguments

| Name   | Type          | isMandatory | Default        |
| ------ | ------------- | ----------- | -------------- |
| period | number        | false       | current period |
| date   | Date / number | false       | current date   |

#### Returns

The Class corresponding to a given period and day.

Type: `string`

#### Quick hint

() -> currentPeriod
(n) -> today's nth period
(n, d) -> Day d's nth period

---

### getClassByDay

Get the Classes schedule corresponding to a given Day.

#### Arguments

| Name | Type       | isMandatory | Default     |
| ---- | ---------- | ----------- | ----------- |
| date | ... string | true        | empty Array |

#### Returns

An array of all the classes thats matches a day.

Type: `Array<string>`

#### Quick hint

For single day

`getClassByDay('Monday') `

For multiple days

`getClassByDay('Monday' , 'Friday')`

---

### getCurrentClass

Get the class for current time.

#### Arguments [Options]

| Name                   | Type    | isMandatory | Default | Description                                |
| ---------------------- | ------- | ----------- | ------- | ------------------------------------------ |
| {useMeaningfulMessage} | boolean | false       | false   | Toggle usage of custom No schedule message |

#### Returns

The current class.

Type: `string`

---

### getNextClass

Get the next upcoming class.

#### Arguments [Options]

| Name           | Type    | isMandatory | Default | Description             |
| -------------- | ------- | ----------- | ------- | ----------------------- |
| {allowNextDay} | boolean | false       | false   | Toggle next day look up |

#### Returns

The next upcoming class.

Type: `string`

---

### getLaterClass

Get the class coming after the next class.

#### Arguments [Options]

| Name           | Type    | isMandatory | Default | Description             |
| -------------- | ------- | ----------- | ------- | ----------------------- |
| {allowNextDay} | boolean | false       | false   | Toggle next day look up |

#### Returns

The class coming after the next class.

Type: `string`

---

## Authors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/KrishnaMoorthy12">
        <img
          src="https://avatars2.githubusercontent.com/u/41967554?s=460&u=69dc07ff57f177df9ca1751df8e9f9028d46fc74&v=4"
          width="128px;"
          alt="KrishnaMoorthy12"
        />
        <br />
        <sub><b>Krishna Moorthy</b></sub>
        </a>
      <br />
    </td>
    <td align="center">
      <a href="https://github.com/sank2000">
        <img
          src="https://avatars1.githubusercontent.com/u/51191409?s=460&u=c07f4572cd5f0130205cb575e1ac728af4a8a88d&v=4"
          width="128px;"
          alt="sank2000"
        />
        <br />
        <sub><b>Santhosh</b></sub></a
      >
      <br />
    </td>
    <td align="center">
      <a href="https://github.com/PranavGPR">
        <img
          src="https://avatars3.githubusercontent.com/u/51258030?s=460&u=112941453bb0ba49a9bc53a3a24a6bc18ddf1612&v=4"
          width="128px;"
          alt="sank2000"
        />
        <br />
        <sub><b>Pranav</b></sub></a
      >
      <br />
    </td>
  </tr>
</table>

## Contributing

Refer the contributing guide [here](CONTRIBUTING.md).

## License

[MIT License](LICENSE)

---

<p align="center">
 Maintained by
</p>
<p align="center">
<img
  src="https://raw.githubusercontent.com/benxene/blobs/main/benxene-w-name-right.png"
   width="128px;"
   alt="log0"
   align="center"
/>
</p>
