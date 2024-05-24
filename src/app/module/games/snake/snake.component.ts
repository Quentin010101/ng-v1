import { Component } from '@angular/core';
import { CardComponent } from '../../../core/shared/card/card.component';
import { SnakeGridComponent } from './grid/grid.component';
import { Subject } from 'rxjs';
import { PopupService } from '../../../service/utils/popup.service';
import { PopUp } from '../../../model/utils/popUp.model';
import { SnakeSettingComponent } from './setting/setting.component';
import { GameService } from '../../../service/games/game.service';
import { GameTypeEnum, NewScore, Score } from '../../../model/games/score.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-snake',
  standalone: true,
  imports: [CardComponent, SnakeGridComponent,SnakeSettingComponent,ReactiveFormsModule],
  templateUrl: './snake.component.html',
  styleUrl: './snake.component.scss'
})
export class SnakeComponent {
  form!: FormGroup
  scores: Score[] = []
  snakeSpeedActive = 0
  lastRenderTime = 0
  point = 0
  $render = new Subject<boolean>()
  $reset = new Subject<boolean>()
  isPlaying:boolean =false

  $size = new Subject<number>()
  speed!: number
  incrementSpeed!: number

  constructor(private _popUpService: PopupService, private _gameService: GameService){
    this.form = new FormGroup({
      size: new FormControl(10, {updateOn: 'blur'}),
      speed: new FormControl(1,{updateOn: 'blur'}),
      incrementSpeed: new FormControl(0.1,{updateOn: 'blur'})
    })

    this.form.valueChanges.subscribe((data) =>{
      if(this.isPlaying) return
      this.$size.next(data['size'])
      this.speed = data['speed']
      this.incrementSpeed = data['incrementSpeed']
    })
  }

  ngOnInit(){
    this._gameService.$scores.subscribe(data => {
      this.scores = data
    })
    this.onInit()
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
    this.snakeSpeedActive = this.snakeSpeedActive + this.incrementSpeed
  }

  public onPlay(){
    this.snakeSpeedActive = this.speed
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

  public onInit(){
    console.log("init")
    this.snakeSpeedActive = 0
    this.point = 0
    this.$reset.next(true)
    this.isPlaying = false
    this.lastRenderTime = 0;
    this.$size.next(this.form.get('size')?.value as number)
  }

  public returnScore(scores :Score[]):number{
    let s = scores.find(el => el.type == GameTypeEnum.SNAKE)
    if(s) return s.score
    return 0
  }

}

