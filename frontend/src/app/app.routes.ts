import { Routes } from '@angular/router';
import { MainpageComponent } from '../mainpage/mainpage.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SettingsComponent } from '../settings/settings.component';
import { ProfileComponent } from '../profile/profile.component';
import { FormsComponent } from '../forms/forms.component';

export const routes: Routes = [
    {
        path: "",
        title: "Bienvenue sur Redskills",
        component: MainpageComponent
    },
    {
        path: "fill_form",
        title: "Formulaire à remplir & compléter",
        component: FormsComponent
    },
    {
        path: "dashboard",
        title: "Redskills - choix du programme",
        component: DashboardComponent
    },
    {
        path: "settings",
        title: "Paramètres",
        component: SettingsComponent
    },
    {
        path: "profile",
        title: "Vos progressions",
        component: ProfileComponent
    }
];