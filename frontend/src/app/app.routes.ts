import { Routes } from '@angular/router';
import { MainpageComponent } from '../components/mainpage/mainpage.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { SettingsComponent } from '../components/settings/settings.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { FormsComponent } from '../components/forms/forms.component';
import { authGuard } from '../config/global/auth.guard';

export const routes: Routes = [
    {
        path: "",
        title: "Bienvenue sur Redskills",
        component: MainpageComponent
    },
    {
        path: "fill_form",
        title: "Formulaire à remplir & compléter",
        component: FormsComponent,
        canActivate: [authGuard]
    },
    {
        path: "dashboard",
        title: "Redskills - choix du programme",
        component: DashboardComponent,
        canActivate: [authGuard]
    },
    {
        path: "settings",
        title: "Paramètres",
        component: SettingsComponent,
        canActivate: [authGuard]
    },
    {
        path: "profile",
        title: "Vos progressions",
        component: ProfileComponent,
        canActivate: [authGuard]
    }
];