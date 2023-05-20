import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import jwt_decode from 'jwt-decode';

import { baseAPI } from "./baseApi";


let token = sessionStorage.getItem('access');

if (token) {
  const decoded: any = jwt_decode(token);
  const exp = decoded.exp;
  const now = new Date().getTime() / 1000;
  if (now > exp) {
    sessionStorage.removeItem('access');
    baseAPI.post('/auth/token/refresh/',
      {
        "refresh": localStorage.getItem('refresh')
      }
    ).then((res: AxiosResponse) => {
      sessionStorage.setItem('access', res.data.access);
      token = res.data.access;
    }
    ).catch((error: AxiosError) => {
      console.log(error);
      throw new Error("アクセストークンの取得に失敗しました。");
    }
    );
  }
}

export const requireTokenApi: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': token ? `JWT ${token}` : ''
  },
  timeout: 2000,
});