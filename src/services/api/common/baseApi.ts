import axios, { AxiosInstance } from "axios"


const token = sessionStorage.getItem('access');
console.log(token)
export const baseAPI: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': token ? `JWT ${token}` : ''
  },
  timeout: 2000,
})  