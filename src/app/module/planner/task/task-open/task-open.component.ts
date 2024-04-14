import { Component, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from '../../../../model/planner/task.model';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from '../../../../z-other/click-outside.directive';
import { ChoiceTagComponent } from '../choice-tag/choice-tag.component';
import { ChoiceComponent } from '../choice/choice.component';
import { EnumerationService } from '../../../../service/planner/enumeration.service';
import { Choice, Choices } from '../../../../model/planner/choice.model';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlannerService } from '../../../../service/planner/planner.service';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { ItemsComponent } from '../items/items.component';
import { CommentairesComponent } from '../commentaires/commentaires.component';
import { Tag } from '../../../../model/planner/tag.model';

@Injectable({
  providedIn: 'root'
})
export class TaskOpenService {
  $task = new Subject<Task>()
}

@Component({
  selector: 'app-task-open',
  standalone: true,
  imports: [ ReactiveFormsModule,CommonModule, ClickOutsideDirective, ChoiceTagComponent, ChoiceComponent, ItemsComponent, CommentairesComponent],
  templateUrl: './task-open.component.html',
  styleUrl: './task-open.component.scss',
  animations:[fadeInOnEnterAnimation(), fadeOutOnLeaveAnimation()]
})
export class TaskOpenComponent {
  task: Task | null = null
  taskForm!: FormGroup
  init: boolean = false
  progressionsChoice: Choices = new Choices("Progression")
  importancesChoice: Choices = new Choices("Importance")

  constructor(private _taskOpenService: TaskOpenService, private _enumService: EnumerationService, private _taskService: PlannerService){
    this._taskOpenService.$task.subscribe(data => {
      this.task = data
      this.setForm(data)
      setTimeout(()=>{this.init = true}, 100)
    })
    this._enumService.$importances.subscribe(data => {
      this.importancesChoice.data = data
    })
    this._enumService.$progressions.subscribe(data => {
      this.progressionsChoice.data = data
    })


  }

  private setForm(task: Task){
    console.log(task.taskorder)
    this.taskForm = new FormGroup({
      taskId: new FormControl(task.taskId, Validators.required),
      title: new FormControl(task.title, Validators.required),
      taskorder: new FormControl(task.taskorder, Validators.required),
      text: new FormControl(task.text, Validators.maxLength(250)),
      progression: new FormControl(task.progression),
      importance: new FormControl(task.importance),
      compartiment: new FormControl(task.compartiment),
      tags: this.createFormArray(task.tags),
      items: this.createFormArray(task.items),
      commentaires: this.createFormArray(task.commentaires),
      dateCreation: new FormControl(task.dateCreation),
      dateEcheance: new FormControl(task.dateEcheance),
  })
  }

  private createFormArray(cible: any): FormArray{
    let arr: FormArray = new FormArray<any>([])
    if(cible){
      for(let i = 0; i < cible.length; i++){
        arr.push(new FormControl(cible[i]))
      }
    }
    return arr;
  }

  closeTask(){
    if(this.init){
      this.saveTask()
      this.task = null
      this.init = false
    }
  }

  onChangeImportance(e: Choice){
    this.taskForm.controls['importance'].setValue(e.data.id)
    this.taskForm.markAsDirty()
  }
  onChangeProgression(e: Choice){
    this.taskForm.controls['progression'].setValue(e.data.id)
    this.taskForm.markAsDirty()
  }
  onChangeCompartiment(e: Choice){
    this.taskForm.controls['compartiment'].setValue(e.data)
    this.taskForm.markAsDirty()
  }

  private saveTask(){
    console.log(this.taskForm)
    if(!this.taskForm.invalid){
      console.log("2")
      if(this.taskForm.dirty){
        let task: Task = Object.assign(new Task(), this.taskForm.value);
        console.log(task)
        this._taskService.update(task).subscribe((data)=>{
          console.log(data)
        })
      }
    }
  }

  onTaskTagDelete(i: number){
    let tagArray = this.taskForm.controls['tags'] as FormArray
    console.log(tagArray)
    // tagArray.removeAt(i)
  }

  
}
