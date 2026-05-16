import axios from "axios";

const defaultHeader = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

// If we are in production (not localhost), we use a relative URL ("")
// so that requests hit the Vercel proxy, which routes them to DigitalOcean.
// If we are local, we use the VITE_BACKEND_URL from the .env file.
const isProduction = window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1";
const baseURL = isProduction ? "" : import.meta.env.VITE_BACKEND_URL;

export const axiosWrapper = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: { ...defaultHeader },
});
