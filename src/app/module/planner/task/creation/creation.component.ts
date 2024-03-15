import { Component, Input } from '@angular/core';
import { Compartiment } from '../../../../model/planner/compartiment.model';
import { PlannerService } from '../../../../service/planner/planner.service';
import { TaskCreationRequest } from '../../../../model/planner/taskCreationRequest.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-creation-task',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './creation.component.html',
  styleUrl: './creation.component.scss'
})
export class TaskCreationComponent {
  @Input() compartiment!: Compartiment
  taskForm!: FormGroup

  constructor(private _plannerService: PlannerService){
    this.taskForm = new FormGroup({
      title: new FormControl('', Validators.required)
    })
  }

  onSubmit(){
    console.log("t")
    console.log(this.compartiment)
    console.log(this.taskForm)
    if(!this.taskForm.invalid && this.compartiment){
      console.log("t")
      let task = new TaskCreationRequest()
      task.compartiment = this.compartiment
      task.title = this.taskForm.controls['title'].value as string
      this._plannerService.newTask(task).subscribe()
    }
  }
}
