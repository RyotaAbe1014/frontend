import { useCallback, useEffect, useState } from 'react';
import { User as UserType } from '../../../types/user/user';
import { userApi } from '../../api/user/user';

type useUser = {
  loading: boolean;
  errorMessage: string | undefined;
  userData: UserType[] | undefined;
  getUserList: () => Promise<void>;
}

export const useUser = (): useUser => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [userData, setUserData] = useState<UserType[] | undefined>(undefined);

  // スプリント一覧取得処理
  const getUserList = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage(undefined);
      const response: UserType[] = await userApi.getUserList();
      setUserData(response);
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, errorMessage, userData, getUserList };
}

