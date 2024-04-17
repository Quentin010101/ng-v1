import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faPenToSquare as t1  } from '@fortawesome/free-regular-svg-icons';
import { faPenToSquare as t2  } from '@fortawesome/free-solid-svg-icons';
import { IconComponent } from '../icon/icon.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'icon-pen-to-square',
  standalone: true,
  imports: [FontAwesomeModule, IconComponent,CommonModule],
  templateUrl: './icon-pen-to-square.component.html',
  styleUrl: './icon-pen-to-square.component.scss'
})
export class IconPenToSquareComponent {
  @Input() hover: boolean = false
  @Input() size: string = ""

  faPenToSquare2=t2
  faPenToSquare1=t1 as IconProp
}
