import styles from './Datepicker.module.scss';

import { parseDate } from '@clipcap/helpers'

import type { TDatePicker } from './type';
/**
 * @function DatePicker
 * @param {TDatePicker} props - The properties of the DatePicker component.
 * @returns {JSX.Element} The DatePicker component.
 *
 * This component provides a way to select a date and listen for changes in the selected date.
 */
const DatePicker = ({ currentTimestamp, onDateChange }: TDatePicker) => {
  const _months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const _weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const prevMonthTimestamp = currentTimestamp - 30 * 24 * 60 * 60 * 1000;
  const nextMonthTimestamp = currentTimestamp + 30 * 24 * 60 * 60 * 1000;

  const _currentDateObject = new Date(currentTimestamp);
  const _currentMonth = _currentDateObject.getMonth();
  const _currentYear = _currentDateObject.getFullYear();
  const _currentHours = _currentDateObject.getHours();
  const _currentMinutes = _currentDateObject.getMinutes();
  const _currentSeconds = _currentDateObject.getSeconds()

  const _todayDateObject = new Date();
  const _todayParsedDate = parseDate(_todayDateObject.getTime());

  const _currentMonthName = _months[_currentMonth];
  const _prevMonthName = _months[new Date(prevMonthTimestamp).getMonth()];
  const _nextMonthName = _months[new Date(nextMonthTimestamp).getMonth()];

  const _lastDayDateObject = new Date(_currentYear, _currentMonth + 1, 0, _currentHours, _currentMinutes, _currentSeconds);
  const _lastDayTimestamp = _lastDayDateObject.getTime();
  const _lastDay = _lastDayDateObject.getDay();
  const _maxDays = _lastDayDateObject.getDate();

  const _firstDayDateObject = new Date(_currentYear, _currentMonth, 1, _currentHours, _currentMinutes, _currentSeconds);
  const _firstDayTimestamp = _firstDayDateObject.getTime();
  const _firstDay = _firstDayDateObject.getDay();
  return (
    <div className={styles.container}>
      
    </div>
  )
}

export { DatePicker }