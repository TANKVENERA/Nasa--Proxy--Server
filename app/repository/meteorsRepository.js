const config = require('../config/config')
const axios = require('axios');
const path = require('path');

const baseUrl = config.apiUrl || 'https://api.nasa.gov'
const apiPath = 'neo/rest/v1/feed';
const apiKey = config.apiKey || 'DEMO_KEY'
const meteorsUrl = new URL(path.join(apiPath), baseUrl);

meteorsUrl.searchParams.append("api_key", apiKey);

const fetchMeteors = async () => {
    return await axios.get(meteorsUrl.toString());
}

module.exports = {fetchMeteors}