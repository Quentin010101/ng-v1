import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CompartimentService } from '../planner/compartiment.service';
import { EnumerationService } from '../planner/enumeration.service';
import { PlannerService } from '../planner/planner.service';
import { TagService } from '../planner/tag.service';
import { AdministrationService } from '../administration.service';
import { Task } from '../../model/planner/task.model';

@Injectable({
  providedIn: 'root'
})
export class LogOutService {
  constructor(private _compartimentService: CompartimentService,
    private _enumerationService: EnumerationService,
    private _plannerService: PlannerService,
    private _tagService: TagService,
    private _administrationService: AdministrationService
   ) { }

   public clearServicesData(){
    this._compartimentService.$compartiment.next([])
    this._enumerationService.$importances.next([])
    this._enumerationService.$progressions.next([])
    this._plannerService.$tasksContainer.next(new Map<number, Task[]>)
    this._tagService.$tags.next([])
    this._administrationService.$users.next([])
   }
}
