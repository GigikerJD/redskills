import { createContext, useContext, useState, type ReactNode } from "react";
import Cookies from "universal-cookie";

interface RedSkillContextType {
    userID: string | null;
    setUserID: React.Dispatch<React.SetStateAction<string | null>>;
    isLogged: boolean;
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
    login: (userID: string) => void;
    logout: () => void;
}

const RedSkillContext = createContext<RedSkillContextType | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode;
}

export const RedSkillProvider = ({ children }: AppProviderProps) => {
    const cookies = new Cookies();
    const [userID, setUserID] = useState<string | null>(cookies.get("userID") || "");
    const [isLogged, setIsLogged] = useState<boolean>(cookies.get("isLogged") || false);

    function login(userID: string): void {
        cookies.set("userID", userID, {
            path: "/",
            domain: "http://localhost:5173",
            secure: true,
            httpOnly: false,
        });
        cookies.set("isLogged", true, {
            path: "/",
            domain: "http://localhost:5173",
            secure: true,
            httpOnly: false,
        });
    }

    function logout(): void {
        cookies.remove("userID");
        cookies.remove("isLogged");
    }

    return (
        <RedSkillContext.Provider
            value={{
                userID,
                isLogged,
                setUserID,
                setIsLogged,
                login,
                logout,
            }}
        >
            {children}
        </RedSkillContext.Provider>
    );
};

export const RedSkillAuth = () => {
    const context = useContext(RedSkillContext);
    if (context === undefined) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};