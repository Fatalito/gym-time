export default (timeMs) => {
  const decisecond = Math.round(timeMs / 100);
  const seconds = (decisecond / 10).toFixed(0);

  return {
    decisecond: decisecond,
    seconds: seconds,
    minutes: Math.floor(seconds / 60),
    secondsForMinutes: (seconds % 60).toFixed(0),
  };
};
