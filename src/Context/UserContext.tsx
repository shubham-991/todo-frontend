import {createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

  export type User = {
    name: string,
    email: string,
    token : string | null;
  }

  export interface UserContextInterface{
    user : User | undefined,
    setUser: Dispatch <SetStateAction<User | undefined>>
  }

  const defaultState = {
    user : undefined,
    setUser : (user : User | undefined) => {}
  } as UserContextInterface;

  export const UserContext = createContext(defaultState)

  type UserProvidedProps = {
    children : ReactNode
  }

  export default function UserProvider( {children} : UserProvidedProps){
    const [user, setUser] = useState<User>();
    const history = useNavigate();

    useEffect(() => {
        if (user) {
          localStorage.setItem("userInfo", JSON.stringify(user));
        }
      }, [user]);

      useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
        setUser(userInfo);

         if (Object.keys(userInfo).length === 0) history("/");
        
      }, []);

    return (
      <UserContext.Provider value = {{user, setUser}}>
        {children}
      </UserContext.Provider>
    )
  }