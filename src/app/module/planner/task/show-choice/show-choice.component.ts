import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faExclamation, faBell, faCircle, faCircleHalfStroke  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-show-choice',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './show-choice.component.html',
  styleUrl: './show-choice.component.scss'
})
export class ShowChoiceComponent {
  @Input() progression!: number
  @Input() importance!: number

  faExclamation=faExclamation
  faBell=faBell
  faCircle=faCircle
  faCircleHalfStroke=faCircleHalfStroke
}
