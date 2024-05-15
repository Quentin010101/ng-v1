import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationService } from '../../service/administration.service';
import { PageComponent } from '../shared/page/page.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PageComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: []
})
export class HomeComponent {
 
}
