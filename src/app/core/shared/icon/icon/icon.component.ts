import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent {
  @Input() hoverInput: boolean = false
  @Input() color: boolean = false
  hover: boolean = false

  public onmouseover(){
    if(this.hoverInput)
    this.hover = true
  }

  public onmouseleave(){
    if(this.hoverInput)
    this.hover = false
  }
}
