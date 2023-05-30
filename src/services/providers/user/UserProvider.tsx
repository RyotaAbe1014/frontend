import React from 'react';
import { UserContext } from '../../contexts/user/UserContext';
import { useUser } from '../../hooks/user/useUser';

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const userValue = useUser();

  return (
    <UserContext.Provider value={userValue}>
      {children}
    </UserContext.Provider>
  );
};
