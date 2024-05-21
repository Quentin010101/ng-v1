import { Component } from '@angular/core';
import { CardComponent } from '../../../core/shared/card/card.component';
import { SnakeGridComponent } from './grid/grid.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-snake',
  standalone: true,
  imports: [CardComponent, SnakeGridComponent],
  templateUrl: './snake.component.html',
  styleUrl: './snake.component.scss'
})
export class SnakeComponent {
  SNAKE_SPEED = 0.5
  lastRenderTime = 0
  $render = new Subject<boolean>()

  ngOnInit(){

  }

   public play(currentTime: number){
     requestAnimationFrame(this.play.bind(this))
     const secSinceLastRender = (currentTime - this.lastRenderTime) / 1000
     if(secSinceLastRender < 1 / this.SNAKE_SPEED) return
     this.$render.next(true)
    this.lastRenderTime = currentTime
  }

  onPlay(){
    this.play(0)
  }
}

