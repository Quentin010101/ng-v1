import { Component, Input } from '@angular/core';

@Component({
  selector: 'snake-setting',
  standalone: true,
  imports: [],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.scss'
})
export class SnakeSettingComponent {
  @Input() result:number = 0
}
