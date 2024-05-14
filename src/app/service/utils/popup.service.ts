import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PopUp, PopUpResponse } from '../../model/utils/popUp.model';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  $popUp: Subject<PopUp> = new Subject<PopUp>
  $answer: Subject<PopUpResponse> = new Subject<PopUpResponse>
  $answerMasterMind: Subject<PopUpResponse> = new Subject<PopUpResponse>
  $answerUserDelete: Subject<PopUpResponse> = new Subject<PopUpResponse>
  
  constructor() { }
}
