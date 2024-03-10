import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  @Input() dashboardChildRoutes!: Routes

}
