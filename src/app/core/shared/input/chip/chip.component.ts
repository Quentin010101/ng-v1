import { CommonModule } from '@angular/common';
import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chip',
  standalone: true,
  imports: [FontAwesomeModule,CommonModule],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss'
})
export class ChipComponent {
  @Input() name!: string
  @Input() actif: boolean = true
  @Output() onDelete = new EventEmitter<boolean>()
  @ContentChild('icon',{static: false}) iconRef!: TemplateRef<any>;
  faXmark=faXmark;

  deleteObejct(e:Event){
    e.stopPropagation()
    this.onDelete.emit(true)
  }
}
