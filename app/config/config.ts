import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.SERVER_PORT ?? 3000,
  apiUrl: process.env.NASSA_API_URL ?? "https://api.nasa.gov",
  apiKey: process.env.NASA_API_TOKEN ?? "DEMO_KEY",
};

export { config };
