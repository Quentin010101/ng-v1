import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloseableService {
  $closeableMenu = new Subject<boolean>()
  constructor() { }
}
