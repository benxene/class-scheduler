"use strict";
exports.__esModule = true;
exports.Schedule = void 0;
var Schedule = /** @class */ (function () {
    function Schedule(calendar, _a) {
        var _b = _a === void 0 ? {
            noScheduleMessage: 'No Schedule',
            breakMessage: 'Break',
            classesOverMessage: 'Classes are over',
            yetToBeginMessage: 'Yet to begin'
        } : _a, noScheduleMessage = _b.noScheduleMessage, breakMessage = _b.breakMessage, classesOverMessage = _b.classesOverMessage, yetToBeginMessage = _b.yetToBeginMessage;
        this.calendar = calendar;
        this.BREAK = -4;
        this.NO_CLASSES = -3;
        this.ENDED = -2;
        this.YET_TO_START = -1;
        this.FREE_BIRD = [this.NO_CLASSES, this.ENDED];
        this.calendar = calendar;
        this.NO_SCHEDULE_MSG = noScheduleMessage;
        this.BREAK_MSG = breakMessage;
        this.CLASSES_OVER_MSG = classesOverMessage;
        this.YET_TO_MSG = yetToBeginMessage;
    }
    /**
     * @returns number corresponding to the day: number
     */
    Schedule.prototype.getDayNumber = function (date) {
        if (date === void 0) { date = new Date(); }
        // @returns 0 -> Sunday, 1-> Monday, ..., 6-> Saturday
        return date.getDay();
    };
    /**
     * Set No schedule custom message
     */
    Schedule.prototype.setNoScheduleMessage = function (message) {
        this.NO_SCHEDULE_MSG = message;
    };
    /**
     * Set Break time custom message
     */
    Schedule.prototype.setBreakMessage = function (message) {
        this.BREAK_MSG = message;
    };
    /**
     * Set all classes over custom message
     */
    Schedule.prototype.setClassesOverMessage = function (message) {
        this.CLASSES_OVER_MSG = message;
    };
    /**
     * Set classes yet to begin custom message
     */
    Schedule.prototype.setYetToStartMessage = function (message) {
        this.YET_TO_MSG = message;
    };
    /**
     * Get time table
     */
    Schedule.prototype.getClassTable = function () {
        return this.calendar.map(function (value) { return value.classes; });
    };
    /**
     * Get period number
     * @returns period number for the given `time`
     *
     * -4 : break
     * -3 : no classes today,
     * -2 : classes have ended,
     * -1 : classes are yet to start
     */
    Schedule.prototype.getPeriodNumber = function (time) {
        if (time === void 0) { time = new Date(); }
        var dayNumber = this.getDayNumber(time);
        var result = this.NO_CLASSES;
        var currentTime = new Date(time.valueOf());
        // check if the day has no classes
        if (this.calendar[dayNumber].classes.length === 0) {
            return result;
        }
        var testTime = new Date(time.valueOf());
        var start = this.calendar[dayNumber].timeRange[0].start;
        var end = this.calendar[dayNumber].timeRange[this.calendar[dayNumber].timeRange.length - 1].end;
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
        if (result === this.NO_CLASSES) {
            // check if its a break
            if (currentTime.getHours() <=
                this.calendar[dayNumber].timeRange[this.calendar[dayNumber].timeRange.length - 1].start.hour &&
                currentTime.getMinutes() <
                    this.calendar[dayNumber].timeRange[this.calendar[dayNumber].timeRange.length - 1].start.minute) {
                return this.BREAK;
            }
        }
        return result;
    };
    /**
     * Get Classes of a given Date/ Day number. Day number 0 corresponds to Sunday.
     * @returns An array of all the classes in the given day.
     */
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
    /**
     * Get the Classes schedule corresponding to given days.
     * @returns An array of all the classes that matches the days.
     */
    Schedule.prototype.getClassByDay = function () {
        var selectedDays = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            selectedDays[_i] = arguments[_i];
        }
        return this.calendar.filter(function (value) {
            for (var _i = 0, selectedDays_1 = selectedDays; _i < selectedDays_1.length; _i++) {
                var selectedDay = selectedDays_1[_i];
                return value.day === selectedDay;
            }
        });
    };
    /**
     * Get the Class corresponding to a given period and day.
     *
     * NOTE:
     * () -> currentPeriod
     * (n) -> today's nth period
     * (n, d) -> Day d's nth period
     */
    Schedule.prototype.getClass = function (period, day) {
        if (period === void 0) { period = this.getPeriodNumber(); }
        var dayNumber;
        if (typeof day === 'number') {
            dayNumber = day;
        }
        else {
            dayNumber = this.getDayNumber(day);
        }
        if (!this.calendar[dayNumber] || this.calendar[dayNumber].classes.length <= period || period < 0) {
            return this.NO_SCHEDULE_MSG;
        }
        return this.calendar[dayNumber].classes[period];
    };
    /**
     * Get the current scheduled class
     */
    Schedule.prototype.getCurrentClass = function (_a) {
        var _b = _a === void 0 ? { useMeaningfulMessage: false } : _a, useMeaningfulMessage = _b.useMeaningfulMessage;
        var currentClass = this.getClass();
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
    };
    /**
     * Get the next upcoming class.
     */
    Schedule.prototype.getNextClass = function (_a) {
        var _b = _a === void 0 ? { allowNextDay: false } : _a, allowNextDay = _b.allowNextDay;
        var currentPeriodNumber = this.getPeriodNumber();
        var nextClass;
        if (this.FREE_BIRD.indexOf(currentPeriodNumber) >= 0) {
            nextClass = this.NO_SCHEDULE_MSG;
        }
        else {
            nextClass = this.getClass(this.getPeriodNumber() + 1);
        }
        if (!allowNextDay) {
            return nextClass;
        }
        // if fetch from next day is allowed
        nextClass = this.getClass(this.getPeriodNumber() + 1);
        for (var nextDayCounter = 1; nextClass === this.NO_SCHEDULE_MSG; nextDayCounter++) {
            var newDay = this.getDayNumber() + nextDayCounter;
            if (newDay > 6) {
                nextDayCounter = -6;
            }
            nextClass = this.getClass(0, newDay);
        }
        return nextClass;
    };
    /**
     * Get the class coming after the next class.
     */
    Schedule.prototype.getLaterClass = function (_a) {
        var _b = _a === void 0 ? { allowNextDay: false } : _a, allowNextDay = _b.allowNextDay;
        var currentPeriodNumber = this.getPeriodNumber();
        var laterClass;
        if (this.FREE_BIRD.indexOf(currentPeriodNumber) >= 0) {
            laterClass = this.NO_SCHEDULE_MSG;
        }
        else {
            laterClass = this.getClass(currentPeriodNumber + 2);
        }
        if (!allowNextDay) {
            return laterClass;
        }
        // if fetch from next day is allowed
        var nextClass = this.getNextClass({ allowNextDay: false });
        if (nextClass === this.NO_SCHEDULE_MSG) {
            for (var nextDayCounter = 1; laterClass === this.NO_SCHEDULE_MSG; nextDayCounter++) {
                var newDay = this.getDayNumber() + nextDayCounter;
                if (newDay > 6) {
                    nextDayCounter = -6;
                }
                laterClass = this.getClass(1, newDay);
            }
        }
        else {
            for (var nextDayCounter = 1; laterClass === this.NO_SCHEDULE_MSG; nextDayCounter++) {
                var newDay = this.getDayNumber() + nextDayCounter;
                if (newDay > 6) {
                    nextDayCounter = -6;
                }
                laterClass = this.getClass(0, newDay);
            }
        }
        return laterClass;
    };
    return Schedule;
}());
exports.Schedule = Schedule;
