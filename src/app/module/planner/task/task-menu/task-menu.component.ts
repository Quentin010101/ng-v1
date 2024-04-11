import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { PlannerService } from '../../../../service/planner/planner.service';
import { MessageService } from '../../../../service/message.service';
import { Message } from '../../../../model/message.model';
import { Task } from '../../../../model/planner/task.model';


@Component({
  selector: 'app-task-menu',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './task-menu.component.html',
  styleUrl: './task-menu.component.scss',

})
export class TaskMenuComponent {
  faTrash = faTrash
  @Input() task!: Task
  
  constructor(private _plannerService: PlannerService, private _messageService: MessageService){
    
  }

  public deleteTask(){
    if(this.task){
      this._plannerService.delete(this.task).subscribe(data => {
        this._messageService.$message.next(new Message(!data.executionStatus, data.message));
      })
    }
  }
}
