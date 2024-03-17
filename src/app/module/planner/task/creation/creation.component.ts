import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Compartiment } from '../../../../model/planner/compartiment.model';
import { PlannerService } from '../../../../service/planner/planner.service';
import { TaskCreationRequest } from '../../../../model/planner/taskCreationRequest.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { ClickOutsideDirective } from '../../../../z-other/click-outside.directive';
import { creationIn, creationOut } from '../../../../z-other/transition';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-creation-task',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, ClickOutsideDirective, CommonModule],
  templateUrl: './creation.component.html',
  styleUrl: './creation.component.scss',
  animations:[creationOut, creationIn]
})
export class TaskCreationComponent {
  @ViewChild('taskInput') taskInput!: ElementRef;
  @Input() compartiment!: Compartiment
  taskForm!: FormGroup
  faPlus = faPlus; faMinus = faMinus
  open = false

  constructor(private _plannerService: PlannerService){
    this.taskForm = new FormGroup({
      title: new FormControl('', Validators.required)
    })
  }

  onSubmit(){
    if(!this.taskForm.invalid && this.compartiment){
      this.open = false;
      let task = new TaskCreationRequest()
      task.compartiment = this.compartiment
      task.title = this.taskForm.controls['title'].value as string
      this._plannerService.newTask(task).subscribe();
      this.taskForm.reset()
    }
  }

  newTaskShow(){
    this.open = !this.open;
    setTimeout(()=>{
      this.open? this.taskInput.nativeElement.focus() : ''
    },10)
  }

  clickOutside(e: any){
    
    if(this.open){
      this.open = false
    }
  }
}
