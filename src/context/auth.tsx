import { useQuery } from '@apollo/client';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { GET_ME } from '../utils/graphql';
import { axiosService } from '../axios/axiosService';
import { toast } from 'react-toastify';

export interface AuthContextProps {
  user: any;
  onLogin: (email: string, password: string) => void;
  refreshUser: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  onLogin: () => {},
  refreshUser: () => {}
});

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export const AuthProvider = (props: {
  children: React.ReactChild[] | React.ReactChild;
}) => {
  const { data: userRes, refetch: refreshUser, error } = useQuery(GET_ME)
  
  const user = useMemo(() => userRes?.me, [userRes])
  const onLogin = async (email: string, password: string) => {
    try {
      const res: any = await axiosService.post('/login', {
        email,
        password
      })

      localStorage.setItem('auth_token', res.data)
      refreshUser()
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  useEffect(() => {
    if (error?.message?.includes('Access denied!')) {
      localStorage.removeItem('auth_token')
    }
  }, [error])

  return (
    <AuthContext.Provider
      value={{
        user,
        onLogin,
        refreshUser
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
