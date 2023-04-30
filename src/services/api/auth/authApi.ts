// authApi.ts
import { baseAPI } from "../common/baseApi";
import { AxiosError, AxiosResponse } from "axios";
import { Token } from "../../../types/auth/token";

const login = async (email: string, password: string): Promise<Token> => {
  return await baseAPI.post('/auth/token/',
    {
      "email": email,
      "password": password
    }
  )
    .then((res: AxiosResponse) => {
      return res.data as Token;
    })
    .catch((error: AxiosError) => {
      console.log(error);
      throw new Error("ログインに失敗しました。");
    });
}

export const authApi = {
  login,
}
