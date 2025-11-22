import { Routes } from '@angular/router';
import { MainpageComponent } from '../mainpage/mainpage.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SettingsComponent } from '../settings/settings.component';
import { ProfileComponent } from '../profile/profile.component';
import { FormsComponent } from '../forms/forms.component';
import { authGuard } from '../config/auth.guard';

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