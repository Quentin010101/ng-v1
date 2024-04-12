import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faEllipsis, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { PlannerService } from '../../../../service/planner/planner.service';
import { MessageService } from '../../../../service/message.service';
import { Message } from '../../../../model/message.model';
import { Task } from '../../../../model/planner/task.model';
import { ClickOutsideDirective } from '../../../../z-other/click-outside.directive';
import { rotateAnimation } from 'angular-animations';


@Component({
  selector: 'app-task-menu',
  standalone: true,
  imports: [FontAwesomeModule, ClickOutsideDirective],
  templateUrl: './task-menu.component.html',
  styleUrl: './task-menu.component.scss',
  animations: [rotateAnimation()]

})
export class TaskMenuComponent {
  faTrash = faTrash; faEllipsis = faEllipsis; faEllipsisVertical=faEllipsisVertical
  @Input() task!: Task
  menuOpen = false
  
  constructor(private _plannerService: PlannerService, private _messageService: MessageService){
    
  }

  public deleteTask(e:Event){
    e.stopPropagation()
    if(this.task){
      this._plannerService.delete(this.task).subscribe(data => {
        this._messageService.$message.next(new Message(!data.executionStatus, data.message));
      })
    }
  }

  clickOutside(e: any){
    if(this.menuOpen){
      this.menuOpen = false
    }
  }
}
