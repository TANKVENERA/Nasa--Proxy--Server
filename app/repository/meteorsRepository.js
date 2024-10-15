const config = require('../config/config')
const axios = require('axios');
const path = require('path');

const baseUrl = config.apiUrl || 'https://api.nasa.gov'
const apiPath = 'neo/rest/v1/feed';
const apiKey = config.apiKey || 'DEMO_KEY'

const fetchMeteors = async (dateFrom, dateTo) => {
    const meteorsUrl = new URL(path.join(apiPath), baseUrl);
    meteorsUrl.searchParams.append("api_key", apiKey);
    if (dateFrom) {
        meteorsUrl.searchParams.append("start_date", dateFrom);
    }
    if (dateTo) {
        meteorsUrl.searchParams.append("end_date", dateTo);
    }
    if (!dateFrom && dateTo) {
        meteorsUrl.searchParams.append("start_date", addDays(dateTo, -7));
    }
    if (!dateTo && dateFrom) {
        meteorsUrl.searchParams.append("end_date", addDays(dateFrom, 7));
    }

    return await axios.get(meteorsUrl.toString());
}

const addDays= (date, days) => {
    let result = new Date(date);
    result.setDate(result.getDate() + days);

    return result.toISOString().split('T')[0];
}

module.exports = {fetchMeteors}