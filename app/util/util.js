const parseStringToBoolean = (str) => {
    return str === "true" ? true : str === "false" ? false : undefined;
}

const parseDates = (dateFrom, dateTo) => {
    if (!dateFrom && !dateTo) {
        const nowDate = getDate();
        return {dateFrom: nowDate, dateTo: getDate(nowDate, 7)}
    }
    else if (!dateFrom && dateTo) {
        return {dateFrom: getDate(dateTo, -7), dateTo: dateTo}
    }
    else if (!dateTo && dateFrom) {
        return {dateFrom: dateFrom, dateTo: getDate(dateFrom, 7)}
    }
    return {dateFrom: dateFrom, dateTo: dateTo}
}

const getDate = (date, days) => {
    let res;
    if (date) {
        res = new Date(date);
        res.setDate(res.getDate() + days);
    } else {
        res = new Date();
    }

    return res.toISOString().split('T')[0];
}

module.exports = {
    parseDates: parseDates,
    parseStringToBoolean: parseStringToBoolean
}
