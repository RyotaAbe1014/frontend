import { useCallback, useState } from 'react';
import { authApi } from '../api/common/auth/authApi';

// ログインカスタムフック
export const useAuth = () => {
  // ログイン状態
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  // ログイン処理
  const login = useCallback((id: string, password: string) => {
    try {
      setLoading(true);
      setErrorMessage(undefined);

      if (id === '') {
        throw new Error('IDを入力してください。');
      }
      if (password === '') {
        throw new Error('パスワードを入力してください。');
      }
      // ログイン処理
      const response = authApi.login(id, password);
      console.log(response);      
      setLoading(false);
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