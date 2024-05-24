import { Injectable } from '@angular/core';
import { environnement } from '../../../environnement';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { NewScore, Score } from '../../model/games/score.model';
import { HttpClient } from '@angular/common/http';
import { ResponseObject } from '../../model/response/responseObjectDto.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  url: string = environnement.backEndUrl + 'games/'
  $scores = new BehaviorSubject<Score[]>([])
  
  constructor(private http: HttpClient) {
    this.init()
  }

  private getAllScore(): Observable<ResponseObject<Score[]>>{
    return this.http.get<ResponseObject<Score[]>>(this.url + "all")
  }

  private newScore(score: NewScore): Observable<ResponseObject<Score>>{
    return this.http.post<ResponseObject<Score>>(this.url + "new", score)
  }

  private updateScore(score: Score): Observable<ResponseObject<Score>>{
    return this.http.post<ResponseObject<Score>>(this.url + "update", score)
  }

  public init(){
    this.getAllScore().subscribe(data => {
      this.$scores.next(data.object)
    })
  }

  public setNewScore(score: NewScore){
    let scores = this.$scores.value

    return this.newScore(score).pipe(
      tap(data => {
        let s = data.object as Score
        scores.push(s)
        this.$scores.next(scores)
      })
    )
  }

  public setUpdateScore(score: Score){
    let scores = this.$scores.value

    return this.updateScore(score).pipe(
      tap(data => {
        let s = data.object as Score
        let newArray = scores.filter(el => el.scoreId != score.scoreId)
        newArray.push(s)
        this.$scores.next(newArray)

      })
    )
  }
}
