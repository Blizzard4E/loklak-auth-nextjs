"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getSession } from "./loklak";

export type User = {
    id: string;
    username: string;
    email: string;
};

interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    //On Mounted Run once, retrigger when refresh page
    useEffect(() => {
        async function fetchUserData() {
            let userData = await getSession();
            console.log(userData);
            if (userData) {
                setUser(userData);
            } else setUser(null);
        }
        fetchUserData();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
