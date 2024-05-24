import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageComponent } from '../../core/shared/page/page.component';
import { GameService } from '../../service/games/game.service';
import { Score } from '../../model/games/score.model';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [RouterOutlet, PageComponent],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})
export class GamesComponent {
  scores: Score[] = []
  
  constructor(private _gameService: GameService){
    _gameService.init()
  }

  ngOnInit(){
  }
}
