import { ReactNode, createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import IUser from "../../types/IUser";
import { useApi } from "../../hooks/useApi";


type Props = {
    children?: ReactNode;
};

interface ILogin {
    email: string;
    password: string;
}

type AuthContextType = {
    currentUser: IUser | undefined;
    signed: boolean;
    signIn: ({ email, password }: ILogin) => Promise<void>;
    signOut: () => void;
};

export const AuthContext = createContext<AuthContextType>({
    currentUser: undefined,
    signed: false,
    signIn: async () => {},
    signOut: async () => {},
});

export const AuthProvider = ({ children }: Props) => {
    const { login } = useApi();
    const [currentUser, setCurrentUser] = useState<IUser | undefined>();
    
    useEffect(() => {
        const loadingStorageData = async () => {
            const storageUserData = localStorage.getItem("@Auth:user");
            const storageUser = storageUserData ? JSON.parse(storageUserData) as IUser : undefined;
            const storageToken = localStorage.getItem("@Auth:token");
    
            if (storageUser && storageToken) {
                setCurrentUser(storageUser);
            }
        };///
        loadingStorageData();
    }, []);
    
    const signIn = async ({ email, password }: ILogin) => {
        const resp = await login( email, password );

        setCurrentUser(resp.user);
        localStorage.setItem("@Auth:token", resp.token);
        localStorage.setItem("@Auth:user", JSON.stringify(resp.user));    
    };

    const signOut = () => {
        localStorage.clear();
        setCurrentUser(undefined);
        return <Navigate to="/" />;
    };
  

    return (
        <AuthContext.Provider value={{
            currentUser,
            signIn,
            signOut,
            signed : !!currentUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}
