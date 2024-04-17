import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Commentaire } from '../../../../model/planner/commentaire.model';

@Component({
  selector: 'app-commentaires',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './commentaires.component.html',
  styleUrl: './commentaires.component.scss'
})
export class CommentairesComponent {
  @Input() taskFomrGroup!: FormGroup

  get commentairesList(): FormArray { 
    return this.taskFomrGroup.get('commentaires') as FormArray
  }

  private addCommentaire(commentaire: Commentaire){
    this.commentairesList.push(new FormGroup({
      commentaireId: new FormControl(commentaire.commentaireId),
      text: new FormControl(commentaire.text),
      dateCreation: new FormControl(commentaire.dateCreation),
    }))
    this.taskFomrGroup.markAsDirty()
  }

  public deleteCommentaire(index: number){
    this.commentairesList.removeAt(index);
    this.taskFomrGroup.markAsDirty()
  }


}
