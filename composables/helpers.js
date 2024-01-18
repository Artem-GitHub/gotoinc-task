export function convertTimeToString (time) {
  const timeInMinutes = time / 60;
  const integerValueInMinutes = Math.trunc(timeInMinutes);
  const decimalValueInMinutes = (Math.floor((timeInMinutes - integerValueInMinutes) / 100 * 60 * 100) / 100);
  const resultTime = integerValueInMinutes + decimalValueInMinutes;
  return resultTime.toFixed(2).split('.').join(':');
};
