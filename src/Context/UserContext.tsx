import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';


export type User = {
  name: string;
  email: string;
  token: string | null;
};

export interface UserContextInterface {
  user: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  updateUserToken: (token: string) => void;
  logout: () => void;
}

const defaultState = {
  user: undefined,
  setUser: (user: User | undefined) => {},
  updateUserToken: (token: string) => {},
  logout: () => {},
} as UserContextInterface;

export const UserContext = createContext(defaultState);

type UserProvidedProps = {
  children: ReactNode;
};

export default function UserProvider({ children }: UserProvidedProps) {
  const [user, setUser] = useState<User>();
  

  useEffect(() => {
    if (user) {
      localStorage.setItem('userInfo', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    setUser(userInfo);
  }, []);

  const updateUserToken = (token: string) => {
    setUser((prevUser) => {
      if (prevUser) {
        return { ...prevUser, token };
      }
      return prevUser;
    });
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(undefined);
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateUserToken, logout }}>
      {children}
    </UserContext.Provider>
  );
}
