import { AxiosError, AxiosResponse } from "axios";

import { requireTokenApi } from "../common/requireTokenApi";
import { User } from "../../../types/user/user";

interface userAPI {
  getUserList: () => Promise<User[]>;
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
}