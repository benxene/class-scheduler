import Schedule from './index';

const sch = new Schedule(calendar);

const testingDate = new Date();
testingDate.setHours(19, 45);

const currentP = sch.getPeriodNumber(testingDate);
console.log(sch.getClass(currentP));
console.log(sch.getClassTable());
