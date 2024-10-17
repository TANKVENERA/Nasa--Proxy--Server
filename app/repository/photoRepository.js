const config = require('../config/config');
const axios = require('axios');
const path = require('path');

const fetchPhotos = async () => {
    return await axios.get(`${config.apiUrl}/mars-photos/api/v1/rovers/curiosity/latest_photos`, {
        params: {
            api_key: config.apiKey
        }
    });
}

module.exports = {fetchPhotos: fetchPhotos}