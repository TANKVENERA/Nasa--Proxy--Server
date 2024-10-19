const config = require("../config/config");
const axios = require("axios");

const fetchMeteors = async (dateFrom, dateTo) => {
  return await axios.get(`${config.apiUrl}/neo/rest/v1/feed`, {
    params: {
      api_key: config.apiKey,
      start_date: dateFrom,
      end_date: dateTo,
    },
  });
};

module.exports = { fetchMeteors };
