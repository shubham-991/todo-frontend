import {createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react"

export type User = {
  name: string,
  email: string
}

export interface UserContextInterface{
  user : User,
  setUser: Dispatch <SetStateAction<User>>
}

const defaultState = {
  user : {
    name : "",
    email : ""
  },
  setUser : (user : User) => {}
} as UserContextInterface

export const UserContext = createContext(defaultState)

type UserProvidedProps = {
  children : ReactNode
}

export default function UserProvider( {children} : UserProvidedProps){
    const [user, setUser] = useState<User>(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      const { name, email } = JSON.parse(storedUserInfo);
      return { name, email };
    } else {
      return {
        name : '',
        email : ''
      };
    }
  });

  useEffect(() => {
    localStorage.setItem('userInfo', JSON.stringify(user));
  }, [user]);


  return (
    <UserContext.Provider value = {{user, setUser}}>
      {children}
    </UserContext.Provider>
  )
}