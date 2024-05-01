import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export class TableContent{
  id!: number
  content!: string[]
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() header!: String[]
  @Input() clickable: boolean = false
  @Input() contents!: TableContent[]
  @Output() onClickEmitter = new EventEmitter<number>()

  onClick(id: number){
    this.onClickEmitter.emit(id)
  }
}
