import { Component } from '@angular/core';
import { CardComponent } from '../../../core/shared/card/card.component';

@Component({
  selector: 'app-snake',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './snake.component.html',
  styleUrl: './snake.component.scss'
})
export class SnakeComponent {
  SNAKE_SPEED = 1
  lastRenderTime = 0

  ngOnInit(){
    this.render(0)
  }

   public render(currentTime: number){
    window.requestAnimationFrame(this.render)
    const secSinceLastRender = currentTime - this.lastRenderTime
  }
}

