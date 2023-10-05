import { User } from "../Domain/entities/User";
import React , {createContext,useState,useEffect} from "react";
import { SaveUserLocalUseCase } from "../Domain/useCases/userLocal/SaveUserLocal";
import { GetUserLocalUseCase } from "../Domain/useCases/userLocal/GetUserLocal";
import { ClearUserLocalUseCase } from "../Domain/useCases/userLocal/ClearUserLocal";

export const userInitialState: User = {
        id:                 '',
        name:               '',
        lastname:           '',
        email:              '',
        phone:              '',
        password:           '',
        confirmPassword:    '',
        accessToken:       '',
        refreshToken:      '',
        image:             '',
        roles:             []
}

export interface UserContextProps {
        user:User,
        saveUserSesion : (user:User) => Promise<void>;
        getUserSession : () => Promise<void>;
        clearUserSession : () => Promise<void>;
}

export const UserContext = createContext({} as UserContextProps)

export const UserProvider = ({children}: any )=>{
        const [user, setUser] = useState(userInitialState);

        useEffect(() => {
                getUserSession()
        }, [])
        
        
        const saveUserSesion = async(user:User) =>{
                await SaveUserLocalUseCase(user);
                setUser(user);
        };

        const getUserSession = async()=>{
                const user = await GetUserLocalUseCase();
                setUser(user);
        }

        const clearUserSession = async() =>{
                await ClearUserLocalUseCase();
                setUser(userInitialState);
        }

        return (
                <UserContext.Provider value={{
                        user,
                        saveUserSesion,
                        getUserSession,
                        clearUserSession
                }}>
                        {children}

                </UserContext.Provider>
        )
}