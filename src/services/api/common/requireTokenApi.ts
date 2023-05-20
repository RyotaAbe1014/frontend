import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import jwt_decode from 'jwt-decode';

import { baseAPI } from "./baseApi";

// Create an axios instance
const requireTokenApi: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 2000,
});

requireTokenApi.interceptors.request.use(async (config) => {
  let token = sessionStorage.getItem('access');
  if (token) {
    const decoded: any = jwt_decode(token);
    const exp = decoded.exp;
    const now = new Date().getTime() / 1000;

    if (now > exp) {
      sessionStorage.removeItem('access');
      try {
        const res: AxiosResponse = await baseAPI.post('/auth/token/refresh/',
          {
            "refresh": localStorage.getItem('refresh')
          }
        );
        sessionStorage.setItem('access', res.data.access);
        token = res.data.access;
      } catch (error: any) {
        console.log(error);
        throw new Error("アクセストークンの取得に失敗しました。");
      }
    }
  }

  // set the Authorization header for the outgoing request
  config.headers['Authorization'] = token ? `JWT ${token}` : '';

  return config;
});

export { requireTokenApi };
