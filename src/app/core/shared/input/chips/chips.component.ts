import { CommonModule } from '@angular/common';
import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chips',
  standalone: true,
  imports: [FontAwesomeModule,CommonModule],
  templateUrl: './chips.component.html',
  styleUrl: './chips.component.scss'
})
export class ChipsComponent {
  @Input() object!: any[]
  @Output() onDelete = new EventEmitter<any>()
  @Output() onDeleteIndex = new EventEmitter<number>()
  @ContentChild('icon',{static: false}) iconRef!: TemplateRef<any>;
  faXmark=faXmark;

  deleteObejct(item: any, i:number){
    this.onDelete.emit(item)
    this.onDeleteIndex.emit(i)
  }
}
