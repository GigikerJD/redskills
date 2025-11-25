import { Navigate } from "react-router-dom";
import { RedSkillAuth } from "./AppProvider";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isLogged } = RedSkillAuth();
    return isLogged ? <>{children}</> : <Navigate to="/" replace/>;
}