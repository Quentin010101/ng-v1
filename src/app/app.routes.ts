import { Routes } from '@angular/router';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { AuthenticationComponent } from './core/authentication/authentication.component';
import { userGuard } from './guard/user.guard';
import { HomeComponent } from './core/home/home.component';
import { PlannerComponent } from './module/planner/planner.component';
import { NotfoundComponent } from './core/shared/notfound/notfound.component';
import { SettingsComponent } from './core/settings/settings.component';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faPenClip } from '@fortawesome/free-solid-svg-icons';
import { faGear, faUsers } from '@fortawesome/free-solid-svg-icons';
import { AdminComponent } from './module/admin/admin/admin.component';
import { plannerGuard } from './guard/config.guard';

export const routes: Routes = [
    {path: 'login', component: AuthenticationComponent, title: 'Login'},
    {path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {path: 'dashboard', component: DashboardComponent, canActivate: [userGuard], children: [
        {
            path:'', redirectTo: 'home', pathMatch: 'full'
        },
        {
            path:'home', component: HomeComponent, title: "Home", data: {
              icon: faHouse, text: 'home'
            }
        },
        {
            path: 'planner', component: PlannerComponent, title: "Planner", canActivate: [plannerGuard], data: {
              icon: faPenClip, text: 'planner', module: 1
            }
        },
        {
            path: 'settings', component: SettingsComponent, title: "Settings", data: {
              icon: faGear, text: 'settings'
            }
        },
        {
            path: 'admin', component: AdminComponent, title: "Administration", data: {
              icon: faUsers, text: 'admin'
            }
        },
    ]},
    {path: '**', component: NotfoundComponent}
];
