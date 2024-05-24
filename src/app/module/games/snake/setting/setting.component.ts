import { Component, Input } from '@angular/core';
import { Score } from '../../../../model/games/score.model';

@Component({
  selector: 'snake-setting',
  standalone: true,
  imports: [],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.scss'
})
export class SnakeSettingComponent {
  @Input() result:number = 0
  @Input() highScore:number = 0
}
