import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
  },
});
