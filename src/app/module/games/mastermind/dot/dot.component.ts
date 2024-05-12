import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dot',
  standalone: true,
  imports: [DragDropModule, CommonModule],
  templateUrl: './dot.component.html',
  styleUrl: './dot.component.scss'
})
export class DotComponent {
  @Input() number: number = 0
}
