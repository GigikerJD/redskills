import { RedSkillAuth } from "../config/AppProvider"

export const Header = () => {
    const { isLogged } = RedSkillAuth();
    return isLogged ? <DashboardHeader/> : <DefaultHeader/>
}

const DefaultHeader = () => {
    return(
        <header>
            Je suis le header par défaut
        </header>
    )
}

const DashboardHeader = () => {
    return(
        <header>
            Je suis le header après connexion
        </header>
    )
}