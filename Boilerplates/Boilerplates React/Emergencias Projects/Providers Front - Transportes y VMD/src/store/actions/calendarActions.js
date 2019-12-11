
import Moment from 'moment';
import UniqueId from '../../components/doctor/User/RandomId';

export const CALENDAR_ADD = 'CALENDAR_DATE_ADDED';
export const CALENDAR_REMOVE = 'CALENDAR_DATE_REMOVED';
export const CALENDAR_INITIAL = 'CALENDAR_DATE_INITIAL';

export function handleSelect(date, dataClone) {

  const id = UniqueId();
  const actualDate = Moment(date.start);
  const endDate = Moment(date.end).add(1, 'days');
  const { _date } = dataClone;
  const cloneDomElements = _date.slice(0);
  const selectedDate = actualDate._d.toString();

  cloneDomElements.push({
    'start': actualDate,
    'end': endDate,
    'selectedDate': selectedDate,
    'id': id,
    'title': 'X'
  });
  return {
    type: CALENDAR_ADD,
    payload: cloneDomElements
  }
}

export function handleRemove(idName, dataClone) {

  var filterArray = [];

  dataClone._date.forEach(function (event, index) {
    var allEvents = event;
    var getId = allEvents.id;
    if (idName !== getId) {
      filterArray.push(event);
    };
  })
  return {
    type: CALENDAR_REMOVE,
    payload: filterArray
  }
}

export function initialCalendarLoad(holidays) {
  var newArray = [];
  if (Array.isArray(holidays)) {
    holidays.forEach(function (date) {
      const id = UniqueId();
      const actualDate = Moment(date);
      const endDate = Moment(date).add(1, 'days');
      const selectedDate = actualDate._d.toString();
      newArray.push({ 'start': actualDate, 'end': endDate, 'selectedDate': selectedDate, 'id': id, 'title': 'X' });
    })
  }
  return {
    type: CALENDAR_ADD,
    payload: newArray
  }
}
