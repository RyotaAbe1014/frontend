import axios, { AxiosInstance } from "axios";


export const baseAPI: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 2000,
});