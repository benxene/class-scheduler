var types_1 = require('./types');
var Schedule = (function () {
    function Schedule(calendar, noScheduleMessage) {
        if (noScheduleMessage === void 0) { noScheduleMessage = 'No Schedule'; }
        this.calendar = calendar;
        this.NO_SCHEDULE = noScheduleMessage;
    }
    Schedule.prototype.getDayNumber = function (date) {
        if (date === void 0) { date = new Date(); }
        // @returns 0 -> Sunday, 1-> Monday, ..., 6-> Saturday
        return date.getDay();
    };
    Schedule.prototype.setNoScheduleMessage = function (message) {
        this.NO_SCHEDULE = message;
    };
    Schedule.prototype.getClassTable = function () {
        return this.calendar.map(function (value) { return value.classes; });
    };
    Schedule.prototype.getPeriodNumber = function (time) {
        /*
         * -3 : no classes today,
         * -2 : classes have ended,
         * -1 : classes are yet to start
         */
        if (time === void 0) { time = new Date(); }
        var dayNumber = this.getDayNumber(time);
        var result = -3;
        var currentTime = new Date(time.valueOf());
        // check if the day has no classes
        if (this.calendar[dayNumber].classes.length === 0) {
            return -3;
        }
        var testTime = new Date(time.valueOf());
        var start = this.calendar[dayNumber].timeRange[0].start;
        var end = this.calendar[dayNumber].timeRange[this.calendar[dayNumber].timeRange.length - 1].end;
        // check if the classes are yet to start
        testTime.setHours(start.hour, start.minute);
        if (currentTime.getTime() < testTime.getTime()) {
            return -1;
        }
        // check if the classes have ended
        testTime.setHours(end.hour, end.minute);
        if (currentTime.getTime() > testTime.getTime()) {
            return -2;
        }
        // Check with current time
        this.calendar[dayNumber].timeRange.forEach(function (_a, index) {
            var start = _a.start, end = _a.end;
            var startTime = new Date(time.valueOf());
            startTime.setHours(start.hour, start.minute);
            var endTime = new Date(time.valueOf());
            endTime.setHours(end.hour, end.minute);
            if (startTime.getTime() <= currentTime.getTime() && currentTime.getTime() <= endTime.getTime()) {
                result = index;
            }
        });
        return result;
    };
    Schedule.prototype.getClasses = function (date) {
        var dayNumber;
        if (typeof date === 'number') {
            dayNumber = date;
        }
        else {
            dayNumber = this.getDayNumber(date);
        }
        return this.calendar[dayNumber].classes;
    };
    Schedule.prototype.getClass = function (period, day) {
        if (period === void 0) { period = this.getPeriodNumber(); }
        /*
         * () -> currentPeriod
         * (n) -> today's nth period
         * (n, d) -> Day d's nth period
         */
        var dayNumber;
        if (typeof day === 'number') {
            dayNumber = day;
        }
        else {
            dayNumber = this.getDayNumber(day);
        }
        if (this.calendar[dayNumber].classes.length < period || period < 0) {
            return this.NO_SCHEDULE;
        }
        return this.calendar[dayNumber].classes[period];
    };
    Schedule.prototype.getCurrentClass = function () {
        return this.getClass();
    };
    Schedule.prototype.getNextClass = function () {
        return this.getClass(this.getPeriodNumber() + 1);
    };
    Schedule.prototype.getLaterClass = function () {
        return this.getClass(this.getPeriodNumber() + 2);
    };
    return Schedule;
})();
var calendar = [
    { day: types_1.Day.Sunday, timeRange: [], classes: [] },
    {
        day: types_1.Day.Monday,
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
        day: types_1.Day.Tuesday,
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
        day: types_1.Day.Wednesday,
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
        day: types_1.Day.Thursday,
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
        day: types_1.Day.Friday,
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
        day: types_1.Day.Saturday,
        timeRange: [],
        classes: []
    }
];
var sch = new Schedule(calendar);
var testingDate = new Date();
testingDate.setHours(19, 45);
var currentP = sch.getPeriodNumber(testingDate);
console.log(sch.getClass(currentP));
console.log(sch.getClassTable());
exports["default"] = Schedule;
/*
getDayNumber()
getClasses()
getPeriodNumber()
getClass()
getCurrentClass()
getNextClass()
getLaterClass()
*/
