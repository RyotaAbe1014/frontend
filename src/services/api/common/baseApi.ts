import axios, { AxiosInstance } from "axios";


export const baseAPI: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 2000,
});