import { AxiosError, AxiosResponse } from "axios";

import { requireTokenApi } from "../common/requireTokenApi";
import { User } from "../../../types/user/user";

interface userAPI {
  getUserList: () => Promise<User[]>;
  createUser: (username: string, email: string, password: string) => Promise<void>;
}


export const userApi: userAPI = {
  // ユーザー一覧取得
  getUserList: async () => {
    return await requireTokenApi.get(`/user/active-users/`)
      .then((response: AxiosResponse) => {
        return response.data as User[];
      })
      .catch((error: AxiosError) => {
        console.log(error);
        throw new Error(error.message);
      });
  },
  // ユーザー作成
  createUser: async (username: string, email: string, password: string) => {
    return await requireTokenApi.post(`/user/create/`,
      {
        username: username,
        email: email,
        password: password
      }
    )
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        console.log(error);
        throw new Error(error.message);
      });
  },
}