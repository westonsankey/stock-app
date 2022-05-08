import { DateTime } from "luxon";

export const formatDate = (date: Date) => {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";
  const seconds = date.getSeconds().toString().padStart(2, "0");
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  const strTime = hours + ":" + minutes + ":" + seconds + " " + ampm;

  return (
    date.getDate() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getFullYear() +
    " " +
    strTime
  );
};

export const timestampToDate = (timestamp: number) => {
  const date = DateTime.fromMillis(timestamp * 1000);
  return `${date.monthShort} ${date.day}, ${date.year}`;
};
