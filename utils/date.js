import moment from "moment";

export const daysWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const convertTimeToEdit = (timeString) => {
  if (!timeString)
    return {
      hours: "00",
      minutes: "00",
      seconds: "00",
    };
  const timeSplit = timeString?.split?.(":");

  return {
    hours: timeSplit?.[0],
    minutes: timeSplit?.[1],
    seconds: timeSplit?.[2],
  };
};

export const convertTimeToDb = (times) =>
  [0, 1].map(
    (i) =>
      `${times?.[i]?.hours}`?.padStart(2, "0") +
      ":" +
      `${times?.[i]?.minutes}`?.padStart(2, "0") +
      ":" +
      `${times?.[i]?.seconds}`?.padStart(2, "0")
  );

export const isCurrentYear = (date) =>
  new Date().getFullYear() === new Date(date).getFullYear();

export const dateTimeUsabilityFormat = (date) =>
  moment(date).format("DD " + (isCurrentYear(date) ? "MMMM" : "MM YY"));

export const getDaysPast = (count = 366) =>
  [...new Array(count)].map((_, idx, arr) => {
    const curDate = moment()
      .startOf("day")
      .subtract(arr.length - 1 - idx, "days")
      .format("YYYY-MM-DD");

    return {
      id: curDate,
      value: moment(curDate).format("MM.DD.YY"),
    };
  });

export const getWeeksPast = (count = 366) => {
  const weeks = [];
  const endDate = moment();
  const startDate = moment().subtract(count, "days");

  // Устанавливаем дату на первый понедельник в диапазоне
  const firstMonday = startDate.clone().day(1);
  if (firstMonday.isBefore(startDate)) {
    firstMonday.add(7, "days"); // Если первый понедельник уже прошел, переходим к следующему
  }

  const currentWeekStart = firstMonday;
  let index = 1;

  while (
    currentWeekStart.isBefore(endDate) ||
    currentWeekStart.isSame(endDate, "day")
  ) {
    const weekEnd = currentWeekStart.clone().add(6, "days"); // Конец недели

    weeks.push({
      id: index,
      value: weekEnd.format("MM.DD.YY"),
    });

    // Переходим к следующей неделе
    currentWeekStart.add(7, "days");
    index++;
  }

  return weeks;
};

export const getMonthsPast = (count = 12) =>
  [...new Array(count)].map((_, i) => ({
    id: i + 1,
    value: new Date(`${i + 1}`).toLocaleDateString("ru", {
      month: "short",
    }),
  }));
