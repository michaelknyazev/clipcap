function timeAgo(time: number | string): string {
  switch (typeof time) {
    case 'number':
      break;
    case 'string':
      time = new Date(time).getTime();
      break;
    default:
      time = new Date().getTime();
  }

  var time_formats = [
    [60, 'seconds', 1], // 60
    [120, '1 minute ago', '1 minute from now'], // 60*2
    [3600, 'minutes', 60], // 60*60, 60
    [7200, '1 hour ago', '1 hour from now'], // 60*60*2
    [86400, 'hours', 3600], // 60*60*24, 60*60
    [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
  ];

  var seconds = (new Date().getTime() - time) / 1000,
    token = 'ago',
    list_choice = 1;

  if (seconds === 0) {
    return 'Just now'
  }

  if (seconds < 0) {
    seconds = Math.abs(seconds);
    token = 'from now';
    list_choice = 2;
  }

  var i = 0, format: (number | string)[];

  while (format = time_formats[i++]) {
    var _ss = format[0] as number;
    if (seconds < _ss) {
      if (typeof format[2] == 'string')
        return format[list_choice] as string;
      else
        return Math.floor(seconds / (format[2] as number)) + ' ' + format[1] + ' ' + token;
    }
  }

  const { readable_with_month_day } = parseDate(time, false);
  return readable_with_month_day;
}

type ParsedDate = {
  day: string | number,
  month: string | number,
  year: number,
  hours: number,
  minutes: number,
  seconds: number,
  readable: string,
  readable_time: string,
  utc_readable_time: string,
  utc_readable_short_time: string,
  readable_with_monthname: string,
  readable_with_month_day: string,
  extended_readable: string,
  passed_time: string | number | null,
  format: (format: string) => string
}

export const parseDate = (timestamp: string | number, ago = true): ParsedDate => {
  const _months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const _days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const _ShortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const _ShortDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const date = new Date(timestamp);
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const weekday = date.getUTCDay();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();

  const yyyy = date.getUTCFullYear();
  const mm = month < 10 ? `0${month}` : month;
  const dd = day < 10 ? `0${day}` : day;
  const hh = hours < 10 ? `0${hours}` : hours;
  const min = minutes < 10 ? `0${minutes}` : minutes;
  const ss = seconds < 10 ? `0${seconds}` : seconds;

  const UTChh = hours < 10 ? `0${hours}` : hours;
  const UTCmin = minutes < 10 ? `0${minutes}` : minutes;
  const UTCss = seconds < 10 ? `0${seconds}` : seconds;

  const UTCjustmin = (60 * hours) + minutes;


  const FormatDate = (format: string) => {
    return format
      .replace("%M", _months[month - 1])
      .replace("%d", `${dd}`)
      .replace("%wd", _ShortDays[weekday])
      .replace("%h", `${hh}`)
      .replace("%m", `${mm}`)
      .replace("%Y", `${yyyy}`)
  }

  return {
    day: dd,
    month: mm,
    year: yyyy,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    readable: `${dd}.${mm}.${yyyy}`,
    readable_time: `${hh}:${min}`,
    utc_readable_short_time: `${UTCjustmin}:${UTCss}`,
    utc_readable_time: `${UTChh}:${UTCmin}:${UTCss}`,
    readable_with_monthname: `${dd} ${_months[month - 1]} ${yyyy}`,
    readable_with_month_day: `${_ShortMonths[month - 1]} ${dd} (${_ShortDays[weekday]}), ${hh}:${mm}`,
    extended_readable: `${dd}.${mm}.${yyyy} ${hh}:${min}:${ss}`,
    passed_time: ago ? timeAgo(timestamp) : null,
    format: FormatDate
  };
};