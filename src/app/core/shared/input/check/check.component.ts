import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-check',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './check.component.html',
  styleUrl: './check.component.scss'
})
export class CheckComponent {
  @Input() checked: boolean = false
  @Input() id: number = 1
  @Input() round: boolean = false
  @Input() size: string = ""
  @Output() outputEmitter = new EventEmitter<boolean>()

  onChange(e: Event){
    this.outputEmitter.emit((e.target as HTMLInputElement).checked)
  }
}
