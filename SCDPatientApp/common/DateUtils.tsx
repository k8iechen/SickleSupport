export const getDateString = (date: Date) => {
  const offset = date.getTimezoneOffset();
  const parsedDate = new Date(date.getTime() - offset * 60 * 1000);
  return parsedDate.toISOString().split("T")[0];
};

export const getHours = (hours: number) => {
  return hours > 12 ? hours - 12 : hours;
};
