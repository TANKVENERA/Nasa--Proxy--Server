const config = require('../config/config')
const axios = require('axios');
const path = require('path');

const baseUrl = config.apiUrl || 'https://api.nasa.gov'
const apiKey = config.apiKey || 'DEMO_KEY'
const apiPath = 'neo/rest/v1/feed';

const fetchMeteors = async (dateFrom, dateTo) => {
    const apiUrl = new URL(path.join(apiPath), baseUrl);
    apiUrl.searchParams.append("api_key", apiKey);
    apiUrl.searchParams.append("start_date", dateFrom);
    apiUrl.searchParams.append("end_date", dateTo);

    return await axios.get(apiUrl.toString());
}

module.exports = {fetchMeteors}