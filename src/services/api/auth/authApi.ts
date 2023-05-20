// authApi.ts
import { requireTokenApi } from "../common/requireTokenApi";
import { baseAPI } from "../common/baseApi";
import { AxiosError, AxiosResponse } from "axios";
import { Token } from "../../../types/auth/token";
import { User } from "../../../types/user/user";

const login = async (email: string, password: string): Promise<Token> => {
  return await requireTokenApi.post('/auth/token/',
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

const getUserByToken = async (accessToken: string): Promise<User> => {
  return await requireTokenApi.get('/auth/user/me/',
    {
      headers: {
        'Authorization': `JWT ${accessToken}`
      }
    }
  ).then((res: AxiosResponse) => {
    return res.data as User;
  }).catch((error: AxiosError) => {
    console.log(error);
    throw new Error("ユーザー情報の取得に失敗しました。");
  });
}


// リフレッシュトークンからアクセストークンを取得
const refresh = async (refreshToken: string): Promise<string> => {
  return await baseAPI.post('/auth/token/refresh/',
    {
      "refresh": refreshToken
    }
  ).then((res: AxiosResponse) => {
    console.log(res.data);
    return res.data.access as string;
  }).catch((error: AxiosError) => {
    console.log(error);
    throw new Error("アクセストークンの取得に失敗しました。");
  });
}

export const authApi = {
  login, getUserByToken, refresh
}
