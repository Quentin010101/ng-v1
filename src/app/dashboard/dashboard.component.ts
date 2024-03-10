import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterOutlet, Routes } from '@angular/router';
import { SidenavComponent } from '../core/shared/sidenav/sidenav.component';
import { NavComponent } from '../core/shared/nav/nav.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, SidenavComponent, NavComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  dashboardChildRoutes!: Routes

  constructor(){
    this.dashboardChildRoutes = (inject(ActivatedRoute).routeConfig?.children as Routes)
  }

}
