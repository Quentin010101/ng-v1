import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Compartiment } from '../../../../model/planner/compartiment.model';
import { PlannerService } from '../../../../service/planner/planner.service';
import { TaskCreationRequest } from '../../../../model/planner/taskCreationRequest.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faMinus, faPen } from '@fortawesome/free-solid-svg-icons';
import { ClickOutsideDirective } from '../../../../z-other/click-outside.directive';
import { creationIn, creationOut } from '../../../../z-other/transition';
import { CommonModule } from '@angular/common';
import { TextComponent } from '../../../../core/shared/input/text/text.component';
import { Subject } from 'rxjs';
import { SupressionComponent } from '../../compartiment/supression/supression.component';

@Component({
  selector: 'app-creation-task',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, ClickOutsideDirective, CommonModule,TextComponent,SupressionComponent],
  templateUrl: './creation.component.html',
  styleUrl: './creation.component.scss',
  animations:[creationOut, creationIn]
})
export class TaskCreationComponent {
  @ViewChild('taskInput') taskInput!: ElementRef;
  @Input() compartiment!: Compartiment
  taskForm!: FormGroup
  faPlus = faPlus; faMinus = faMinus; faPen=faPen
  open = false
  focusValue: Subject<boolean> = new Subject();
  resetValue: Subject<boolean> = new Subject();
  
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

  onTaskChange(str:string){
    this.taskForm.controls['title'].setValue(str)
  }

  newTaskShow(){
    this.open = !this.open;
    setTimeout(()=>{ this.focusValue.next(true) },10)
    
  }

  clickOutside(e: any){
    if(this.open){
      this.open = false
    }
  }
}
