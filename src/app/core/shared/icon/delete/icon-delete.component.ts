import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faTrashCan as t1  } from '@fortawesome/free-regular-svg-icons';
import { faTrashCan as t2  } from '@fortawesome/free-solid-svg-icons';
import { IconComponent } from '../icon/icon.component';


@Component({
  selector: 'icon-delete',
  standalone: true,
  imports: [FontAwesomeModule, IconComponent],
  templateUrl: './icon-delete.component.html',
  styleUrl: './icon-delete.component.scss'
})
export class IconDeleteComponent {
  @Input() hover: boolean = false

  faTrashCan2=t2
  faTrashCan1=t1 as IconProp
}
