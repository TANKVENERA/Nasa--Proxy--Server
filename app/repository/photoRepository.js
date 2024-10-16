const config = require('../config/config');
const axios = require('axios');
const path = require('path');

const fetchPhotos = async () => {
    const baseUrl = config.apiUrl || 'https://api.nasa.gov'
    const apiKey = config.apiKey || 'DEMO_KEY'
    const apiPath = 'mars-photos/api/v1/rovers/curiosity/latest_photos';

    const apiUrl = new URL(path.join(apiPath), baseUrl);
    apiUrl.searchParams.append("api_key", apiKey);

    return await axios.get(apiUrl.toString());
}

module.exports = {fetchPhotos: fetchPhotos}