const useDateDiff = function (startDate, endDate) {
  const dt1 = new Date(startDate);
  const dt2 = new Date(endDate);
  let remains = Math.floor(
    (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
      Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
      (1000 * 60 * 60 * 24)
  );

  return remains > 1 ? `${remains} days remaining` : `${remains} day remaining`;
};

export default useDateDiff;
