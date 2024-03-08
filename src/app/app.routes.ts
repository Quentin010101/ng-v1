import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { userGuard } from './guard/user.guard';

export const routes: Routes = [
    {path: 'login', component: AuthenticationComponent},
    {path: '', component: DashboardComponent, canActivate: [userGuard] },
    {path: 'dashboard', component: DashboardComponent, canActivate: [userGuard]}
];
