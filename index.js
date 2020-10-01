"use strict";
exports.__esModule = true;
var Schedule = (function () {
    function Schedule(calendar, _a) {
        var _b = _a === void 0 ? {
            noScheduleMessage: 'No Schedule',
            breakMessage: 'Break',
            classesOverMessage: 'Classes are over',
            yetToBeginMessage: 'Yet to begin'
        } : _a, noScheduleMessage = _b.noScheduleMessage, breakMessage = _b.breakMessage, classesOverMessage = _b.classesOverMessage, yetToBeginMessage = _b.yetToBeginMessage;
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
    Schedule.prototype.getDayNumber = function (date) {
        if (date === void 0) { date = new Date(); }
        return date.getDay();
    };
    Schedule.prototype.setNoScheduleMessage = function (message) {
        this.NO_SCHEDULE_MSG = message;
    };
    Schedule.prototype.setBreakMessage = function (message) {
        this.BREAK_MSG = message;
    };
    Schedule.prototype.setClassesOverMessage = function (message) {
        this.CLASSES_OVER_MSG = message;
    };
    Schedule.prototype.setYetToStartMessage = function (message) {
        this.YET_TO_MSG = message;
    };
    Schedule.prototype.getClassTable = function () {
        return this.calendar.map(function (value) { return value.classes; });
    };
    Schedule.prototype.getPeriodNumber = function (time) {
        if (time === void 0) { time = new Date(); }
        var dayNumber = this.getDayNumber(time);
        var result = this.NO_CLASSES;
        var currentTime = new Date(time.valueOf());
        if (this.calendar[dayNumber].classes.length === 0) {
            return result;
        }
        var testTime = new Date(time.valueOf());
        var start = this.calendar[dayNumber].timeRange[0].start;
        var end = this.calendar[dayNumber].timeRange[this.calendar[dayNumber].timeRange.length - 1].end;
        testTime.setHours(start.hour, start.minute);
        if (currentTime.getTime() < testTime.getTime()) {
            return this.YET_TO_START;
        }
        testTime.setHours(end.hour, end.minute);
        if (currentTime.getTime() > testTime.getTime()) {
            return this.ENDED;
        }
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
            if (this.calendar[dayNumber].timeRange[0].start.hour < currentTime.getHours() &&
                currentTime.getHours() <
                    this.calendar[dayNumber].timeRange[this.calendar[dayNumber].timeRange.length - 1].start.hour) {
                return this.BREAK;
            }
        }
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
    Schedule.prototype.getClassByDay = function () {
        var day = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            day[_i] = arguments[_i];
        }
        return this.calendar.filter(function (value) {
            var i;
            for (i = 0; i < day.length; i++) {
                if (value.day === day[i]) {
                    return true;
                }
            }
        });
    };
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
    Schedule.prototype.getCurrentClass = function (_a) {
        var useMeaningfulMessage = (_a === void 0 ? { useMeaningfulMessage: false } : _a).useMeaningfulMessage;
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
    Schedule.prototype.getNextClass = function (_a) {
        var allowNextDay = (_a === void 0 ? { allowNextDay: false } : _a).allowNextDay;
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
    Schedule.prototype.getLaterClass = function (_a) {
        var allowNextDay = (_a === void 0 ? { allowNextDay: false } : _a).allowNextDay;
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
exports["default"] = Schedule;
