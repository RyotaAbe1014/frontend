import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/hooks/useAuth';

type Props = {
  children: React.ReactNode;
};

const AuthRoute = ({ children }: Props) => {
  const navigate = useNavigate();
  const { isLogin } = useAuth();
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      setIsAuthLoading(true);
      const authenticated = await isLogin();
      setIsAuth(authenticated);
      if (!authenticated) {
        navigate('/login');
      }
      setIsAuthLoading(false);
    };

    checkLoginStatus();
  }, [isLogin, navigate]);


  return (
    <>
      {!isAuthLoading ? (
        isAuth ? (
          children
        ) : (
          <div>Unauthorized Access</div>
        )
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export { AuthRoute };
