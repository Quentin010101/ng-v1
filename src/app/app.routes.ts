import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthenticationComponent } from './core/authentication/authentication.component';
import { userGuard } from './guard/user.guard';
import { HomeComponent } from './core/home/home.component';
import { PlannerComponent } from './module/planner/planner.component';
import { NotfoundComponent } from './core/notfound/notfound.component';

export const routes: Routes = [
    {path: 'login', component: AuthenticationComponent},
    {path: '', component: DashboardComponent, canActivate: [userGuard] },
    {path: 'dashboard', component: DashboardComponent, canActivate: [userGuard], children: [
        {
            path:'', component: HomeComponent
        },
        {
            path:'home', component: HomeComponent
        },
        {
            path: 'planner', component: PlannerComponent
        }
    ]},
    {path: '**', component: NotfoundComponent}
];
