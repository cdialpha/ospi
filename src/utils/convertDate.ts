import moment from "moment";

export const getPostAge = (postDateTime: Date) => {
  const today = new Date();
  const todayTimeStamp = today.getTime();
  const postTimeStamp = postDateTime.getTime();
  const diff = todayTimeStamp - postTimeStamp;
  let age;

  if (diff >= 31540000000) {
    let YY = Math.floor(diff / 31540000000);
    let MM = Math.floor((diff - YY * 31540000000) / 2628000000);
    let DD = Math.floor((diff - YY * 31540000000 - MM * 2628000000) / 86400000);
    let age = `${YY} years, ${MM} months ago`;
    return age;
  } else if (diff <= 31540000000 && diff >= 2628000000) {
    let YY = 0;
    let MM = Math.floor(diff / 12);
    let DD = Math.floor((diff - MM * 2628000000) / 86400000);
    let age = `${MM} months, ${DD} days ago`;
    return age;
  } else if (diff <= 2628000000 && diff >= 86400000) {
    let YY = 0;
    let MM = 0;
    let DD = Math.floor(diff / 86400000);
    let age = `${DD} days ago`;
    return age;
  } else {
    let YY = 0;
    let MM = 0;
    let DD = 0;
    let HH = Math.floor(diff / 3600000);
    let age = `${HH} hours ago`;
    return age;
  }
};
