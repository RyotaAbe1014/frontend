import React from 'react';
import { User as UserType } from '../../../types/user/user';

type UserContextType = {
  loading: boolean;
  errorMessage: string | undefined;
  userData: UserType[] | undefined;
  getUserList: () => Promise<void>;
};

export const UserContext = React.createContext<UserContextType>({
  loading: false,
  errorMessage: undefined,
  userData: undefined,
  getUserList: async () => { },
});
