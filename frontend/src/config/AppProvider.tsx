import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import Cookies from "universal-cookie";

interface RedSkillContextType {
    userID: string | null;
    setUserID: React.Dispatch<React.SetStateAction<string | null>>;
    isLogged: boolean;
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
    login: (userID: string) => void;
    logout: () => void;
}
interface RedSkillProviderProps {
    children: ReactNode;
}

const RedSkillContext = createContext<RedSkillContextType | undefined>(undefined);
const cookies = new Cookies();

export const RedSkillProvider = ({ children }: RedSkillProviderProps) => {
    const [userID, setUserID] = useState<string | null>(cookies.get("userID") || null);
    const [isLogged, setIsLogged] = useState<boolean>(cookies.get("isLogged") || false);

    function login(userID: string): void {
        cookies.set("userID", userID, {
            path: "/",
            domain: "localhost",
            secure: false,
            httpOnly: false,
        });
        cookies.set("isLogged", true, {
            path: "/",
            domain: "localhost",
            secure: false,
            httpOnly: false,
        });
        setUserID(userID);
        setIsLogged(true);
    }

    function logout(): void {
        cookies.remove("userID", { path: "/", domain: "localhost" });
        cookies.remove("isLogged", { path: "/", domain: "localhost" });
        setUserID("");
        setIsLogged(false);
    }

    const memoProviderValues = useMemo(() => {
        return {
            userID,
            isLogged,
            setUserID,
            setIsLogged,
            login,
            logout
        }
    }, [isLogged, userID]);

    return (
        <RedSkillContext.Provider value={memoProviderValues}>
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