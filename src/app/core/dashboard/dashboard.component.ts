import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet, RouterState, RouterStateSnapshot, Routes } from '@angular/router';
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
  @ViewChild("o") out!: RouterOutlet
  activeRoute

  constructor(private router: Router){
    this.activeRoute = inject(ActivatedRoute)
    this.dashboardChildRoutes = (this.activeRoute.routeConfig?.children as Routes)
  }

  getLastPath(){
    let url = this.router.url
    let arr = url.split("/")
    return arr[arr.length - 1]
  }

  getState(outlet: RouterOutlet) {
    if(outlet && outlet.isActivated){
      return  outlet.activatedRouteData['state'];
    }else{
      return this.getLastPath()
    }
  }

}
