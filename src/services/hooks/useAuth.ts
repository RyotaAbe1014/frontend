import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import { authApi } from '../api/auth/authApi';
import { Token } from '../../types/auth/token';
import { User } from '../../types/user/user';

type Auth = {
  loading: boolean;
  errorMessage: string | undefined;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLogin: () => Promise<boolean>;
}

export const useAuth = (): Auth => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  // ログイン処理
  const login = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      setErrorMessage(undefined);

      if (email === '') {
        throw new Error('メールアドレスを入力してください。');
      }
      if (password === '') {
        throw new Error('パスワードを入力してください。');
      }
      // ログイン処理
      const response: Token = await authApi.login(email, password);
      // セッショントークンとアクセストークンを保存
      sessionStorage.setItem('access', response.access);
      localStorage.setItem('refresh', response.refresh);
      // ユーザー情報を取得
      const user: User = await authApi.getUserByToken(response.access);
      // ユーザー情報を保存
      localStorage.setItem('user', JSON.stringify(user));
      setLoading(false);
      navigate("/");
    }
    catch (error: any) {
      setLoading(false);
      setErrorMessage(error.message);
    }
  }, []);

  // ログアウト処理
  const logout = useCallback(() => {
    sessionStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('user');
    navigate("/login");
  }, []);

  // ログイン判定
  const isLogin = useCallback(async () => {
    const access = sessionStorage.getItem('access');
    console.log(access);
    const refresh = localStorage.getItem('refresh');
    if (access && refresh) {
      const decoded: any = jwt_decode(access);
      const now = new Date().getTime() / 1000;
      if (now > decoded.exp) {
        // アクセストークンの時間切れの場合はリフレッシュトークンからアクセストークンを取得
        try {
          sessionStorage.removeItem('access');
          const res = await authApi.refresh(refresh);
          sessionStorage.setItem('access', res);
          console.log('アクセストークンを更新しました。');
          isLogin();
        } catch (error) {
          console.log(error);
          logout();
          return false;
        }
      }
      return true;
    }
    return false;
  }, []);
  


  return { loading, errorMessage, login, logout, isLogin };
}
