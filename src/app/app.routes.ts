import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthenticationComponent } from './core/authentication/authentication.component';
import { userGuard } from './guard/user.guard';
import { HomeComponent } from './core/home/home.component';
import { PlannerComponent } from './module/planner/planner.component';
import { NotfoundComponent } from './core/shared/notfound/notfound.component';
import { SettingsComponent } from './core/settings/settings.component';

export const routes: Routes = [
    {path: 'login', component: AuthenticationComponent},
    {path: '', component: DashboardComponent, canActivate: [userGuard] },
    {path: 'dashboard', component: DashboardComponent, canActivate: [userGuard], children: [
        {
            path:'', component: HomeComponent
        },
        {
            path:'home', component: HomeComponent, data: {
              icon: 'home', text: 'home'
            }
        },
        {
            path: 'planner', component: PlannerComponent, data: {
              icon: 'date_range', text: 'planner'
            }
        },
        {
            path: 'settings', component: SettingsComponent, data: {
              icon: 'settings', text: 'settings'
            }
        },
    ]},
    {path: '**', component: NotfoundComponent}
];
