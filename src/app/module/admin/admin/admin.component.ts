import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageComponent } from '../../../core/shared/page/page.component';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet,PageComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  animations: []
})
export class AdminComponent {

}
