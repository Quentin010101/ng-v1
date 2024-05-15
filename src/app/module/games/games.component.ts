import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageComponent } from '../../core/shared/page/page.component';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [RouterOutlet, PageComponent],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})
export class GamesComponent {

}
