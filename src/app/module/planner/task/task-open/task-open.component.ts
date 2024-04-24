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
import { Item } from '../../../../model/planner/item.model';
import { Commentaire } from '../../../../model/planner/commentaire.model';
import { Validation } from '../../../../../validation';

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
    this.taskForm = new FormGroup({
      taskId: new FormControl(task.taskId, Validation.input.task.taskId),
      title: new FormControl(task.title, Validation.input.task.title),
      taskorder: new FormControl(task.taskorder, Validators.required),
      text: new FormControl(task.text, Validation.input.task.text),
      progression: new FormControl(task.progression),
      importance: new FormControl(task.importance),
      compartiment: new FormControl(task.compartiment),
      tags: this.createTagFormArray(task.tags),
      items: this.createItemFormArray(task.items),
      commentaires: this.createCommentaireFormArray(task.commentaires),
      dateCreation: new FormControl(task.dateCreation,Validation.input.task.dateCreation),
      dateEcheance: new FormControl(task.dateEcheance),
  })
  }

  private createCommentaireFormArray(commentaires: Commentaire[]): FormArray{
    let arr: FormArray = new FormArray<any>([])
    if(commentaires){
      for(let i = 0; i < commentaires.length; i++){
        arr.push(new FormGroup({
          commentaireId: new FormControl(commentaires[i].commentaireId,Validation.input.task.commentaire.commentaireId),
          text: new FormControl(commentaires[i].text,Validation.input.task.commentaire.text),
          dateCreation: new FormControl(commentaires[i].dateCreation,Validation.input.task.commentaire.dateCreation),
        }))
      }
    }
    return arr;
  }
  private createTagFormArray(tags: Tag[]): FormArray{
    let arr: FormArray = new FormArray<any>([])
    if(tags){
      for(let i = 0; i < tags.length; i++){
        arr.push(new FormGroup({
          tagId: new FormControl(tags[i].tagId,Validation.input.task.tag.tagId),
          name: new FormControl(tags[i].name,Validation.input.task.tag.name),
        }))
      }
    }
    return arr;
  }
  private createItemFormArray(items: Item[]): FormArray{
    let arr: FormArray = new FormArray<any>([])
    if(items){
      for(let i = 0; i < items.length; i++){
        arr.push(new FormGroup({
          itemId: new FormControl(items[i].itemId,Validation.input.task.item.itemId),
          text: new FormControl(items[i].text,Validation.input.task.item.text),
          actif: new FormControl(items[i].actif,Validation.input.task.item.actif),
        }))
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
    if(!this.taskForm.invalid){
      if(this.taskForm.dirty){
        let task: Task = Object.assign(new Task(), this.taskForm.value);
        this._taskService.update(task).subscribe((data)=>{})
      }
    }
  }


  
}
