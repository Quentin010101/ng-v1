import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss'
})
export class TooltipComponent {
  @Input() text: string = '';
  @Input() position: string = 'top';
  isVisible: boolean = false;

  showTooltip() {
    this.isVisible = true;
  }

  hideTooltip() {
    this.isVisible = false;
  }
}
