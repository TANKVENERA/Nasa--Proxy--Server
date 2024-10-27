const parseDates = (dateFrom?: string, dateTo?: string) => {
  const nowDate = getDate(0);
  if (!dateFrom && !dateTo) {
    return { parsedDateFrom: nowDate, parsedDateTo: getDate(7, nowDate) };
  } else if (!dateFrom && dateTo) {
    return { parsedDateFrom: getDate(-7, dateTo), parsedDateTo: dateTo };
  } else if (!dateTo && dateFrom) {
    return { parsedDateFrom: dateFrom, parsedDateTo: getDate(7, dateFrom) };
  } else {
    return {
      parsedDateFrom: dateFrom ?? nowDate,
      parsedDateTo: dateTo ?? nowDate,
    };
  }
};

const getDate = (days: number, date?: string) => {
  let res;
  if (date === undefined) {
    res = new Date();
  } else {
    res = new Date(date);
    res.setDate(res.getDate() + days);
  }

  return res.toISOString().split("T")[0];
};

export { parseDates };
