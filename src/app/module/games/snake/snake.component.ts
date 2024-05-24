import { Component } from '@angular/core';
import { CardComponent } from '../../../core/shared/card/card.component';
import { SnakeGridComponent } from './grid/grid.component';
import { Subject } from 'rxjs';
import { PopupService } from '../../../service/utils/popup.service';
import { PopUp } from '../../../model/utils/popUp.model';
import { SnakeSettingComponent } from './setting/setting.component';
import { GameService } from '../../../service/games/game.service';
import { GameTypeEnum, NewScore, Score } from '../../../model/games/score.model';

@Component({
  selector: 'app-snake',
  standalone: true,
  imports: [CardComponent, SnakeGridComponent,SnakeSettingComponent],
  templateUrl: './snake.component.html',
  styleUrl: './snake.component.scss'
})
export class SnakeComponent {
  scores: Score[] = []
  SNAKE_SPEED = 6
  snakeSpeedActive = 0.2
  lastRenderTime = 0
  point = 0
  $render = new Subject<boolean>()
  $reset = new Subject<boolean>()
  isPlaying:boolean =false

  constructor(private _popUpService: PopupService, private _gameService: GameService){}

  ngOnInit(){
    this._gameService.$scores.subscribe(data => {
      this.scores = data
    })

  }

   public play(currentTime: number){
    if(this.isPlaying){
      requestAnimationFrame(this.play.bind(this))
      const secSinceLastRender = (currentTime - this.lastRenderTime) / 1000
      if(secSinceLastRender < 1 / this.snakeSpeedActive) return
      this.$render.next(true)
      this.lastRenderTime = currentTime
    }
  }

  onUpdate(bool: boolean){
    this.point = this.point + 1
    this.snakeSpeedActive = this.snakeSpeedActive + 1
  }

  public onPlay(){
    this.snakeSpeedActive = this.SNAKE_SPEED
    this.isPlaying = true
    this.play(0)
  }

  private onStop(){
    this.isPlaying = false
  }

  public onEnd(boo: boolean){
    let pop = new PopUp("You loose. Try again!")
    this.setHighScore(this.point)
    pop.warning = true
    this._popUpService.$popUp.next(pop)
    this._popUpService.$answer.subscribe(() => {
      this.reinit()
    })
    this.onStop()
  }

  private setHighScore(score: number){
    let s = this.scores.find(el => el.type == GameTypeEnum.SNAKE)
    if(s){
      s.score = score
      this._gameService.setUpdateScore(s).subscribe()
    }else{
      let newScore = new NewScore()
      newScore.score = score
      newScore.type = GameTypeEnum.SNAKE
      this._gameService.setNewScore(newScore).subscribe()
    }
  }

  public reinit(){
    this.snakeSpeedActive = 0
    this.point = 0
    this.$reset.next(true)
    this.isPlaying = false
    this.lastRenderTime = 0;
  }

  public returnScore(scores :Score[]):number{
    let s = scores.find(el => el.type == GameTypeEnum.SNAKE)
    if(s) return s.score
    return 0
  }
}

