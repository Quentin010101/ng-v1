import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterOutlet, Routes } from '@angular/router';
import { SidenavComponent } from '../shared/sidenav/sidenav.component';
import { NavComponent } from '../shared/nav/nav.component';
import { slideInAnimation } from '../../z-other/transition';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, SidenavComponent, NavComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  animations: [slideInAnimation]
})
export class DashboardComponent {
  dashboardChildRoutes!: Routes

  constructor(){
    this.dashboardChildRoutes = (inject(ActivatedRoute).routeConfig?.children as Routes)
  }

  getState(outlet: any) {
    console.log(outlet.activatedRouteData.state)
    return outlet.activatedRouteData.state;
  }

}
