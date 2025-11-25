import { RedSkillAuth } from "../config/AppProvider"

export const Footer = () => {
    const { isLogged } = RedSkillAuth();
    return isLogged ? <DashboardFooter/> : <DefaultFooter/>
}

const DefaultFooter = () => {
    return(
        <footer>
            Je suis le footer par défaut
        </footer>
    )
}

const DashboardFooter = () => {
    return(
        <footer>
            Je suis le footer après connexion
        </footer>
    )
}