import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Commentaire } from '../../../../model/planner/commentaire.model';
import { IconDeleteComponent } from '../../../../core/shared/icon/delete/icon-delete.component';
import { Validation } from '../../../../../validation';

@Component({
  selector: 'app-commentaires',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,IconDeleteComponent],
  templateUrl: './commentaires.component.html',
  styleUrl: './commentaires.component.scss'
})
export class CommentairesComponent {
  @Input() taskFomrGroup!: FormGroup
  textareaIsEmpty: boolean = true

  get commentairesList(): FormArray { 
    return this.taskFomrGroup.get('commentaires') as FormArray
  }

  private addCommentaire(commentaire: Commentaire){
    this.commentairesList.push(new FormGroup({
      commentaireId: new FormControl(commentaire.commentaireId, Validation.input.task.commentaire.commentaireId),
      text: new FormControl(commentaire.text, Validation.input.task.commentaire.text),
      dateCreation: new FormControl(commentaire.dateCreation, Validation.input.task.commentaire.dateCreation),
    }))
    this.taskFomrGroup.markAsDirty()
  }

  public addNewCommentaire(str: string){
    let commentaire = new Commentaire()
    commentaire.dateCreation = new Date()
    commentaire.text = str 
    this.addCommentaire(commentaire)
  }

  public deleteCommentaire(e:Event, index: number){
    e.stopPropagation()
    this.commentairesList.removeAt(index);
    this.taskFomrGroup.markAsDirty()
  }

  public orderList(commentaires: Commentaire[]):Commentaire[]{
    return commentaires.sort((a,b)=> {
      return  new Date(b.dateCreation).getTime() - new Date(a.dateCreation).getTime()
    })
  }

  public onTextareaInput(e: Event){
    let value = (e.target as HTMLTextAreaElement).value
    if(value.length > 0){
      this.textareaIsEmpty = false
    }else{
      this.textareaIsEmpty = true
    }
  }


}
