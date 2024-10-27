import { config } from "../config/config.js";
import axios from "axios";

const fetchPhotos = async () => {
  return await axios.get(
    `${config.apiUrl}/mars-photos/api/v1/rovers/curiosity/latest_photos`,
    {
      params: {
        api_key: config.apiKey,
      },
    },
  );
};

export { fetchPhotos };
