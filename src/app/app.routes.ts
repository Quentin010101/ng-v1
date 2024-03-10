import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthenticationComponent } from './core/authentication/authentication.component';
import { userGuard } from './guard/user.guard';
import { HomeComponent } from './core/home/home.component';
import { PlannerComponent } from './module/planner/planner.component';
import { NotfoundComponent } from './core/shared/notfound/notfound.component';
import { SettingsComponent } from './core/settings/settings.component';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faPenClip } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';

export const routes: Routes = [
    {path: 'login', component: AuthenticationComponent},
    {path: '', component: DashboardComponent, canActivate: [userGuard] },
    {path: 'dashboard', component: DashboardComponent, canActivate: [userGuard], children: [
        {
            path:'', component: HomeComponent
        },
        {
            path:'home', component: HomeComponent, data: {
              icon: faHouse, text: 'home'
            }
        },
        {
            path: 'planner', component: PlannerComponent, data: {
              icon: faPenClip, text: 'planner'
            }
        },
        {
            path: 'settings', component: SettingsComponent, data: {
              icon: faGear, text: 'settings'
            }
        },
    ]},
    {path: '**', component: NotfoundComponent}
];
