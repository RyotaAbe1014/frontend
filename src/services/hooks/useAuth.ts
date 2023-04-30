import { useCallback, useState } from 'react';
import { authApi } from '../api/auth/authApi';
import { Token } from '../../types/auth/token';
import { useNavigate } from 'react-router-dom';

type Auth = {
  loading: boolean;
  errorMessage: string | undefined;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// ログインカスタムフック
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
      localStorage.setItem('access', response.access);
      localStorage.setItem('refresh', response.refresh);
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
  }, []);

  return { loading, errorMessage, login, logout };
}
