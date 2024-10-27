import { config } from "../config/config.js";
import axios from "axios";

const fetchMeteors = async (dateFrom: string, dateTo: string) => {
  return await axios.get(`${config.apiUrl}/neo/rest/v1/feed`, {
    params: {
      api_key: config.apiKey,
      start_date: dateFrom,
      end_date: dateTo,
    },
  });
};

export { fetchMeteors };
