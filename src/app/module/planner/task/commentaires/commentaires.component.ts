import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';

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

  public addCommentaire(){

  }

  public deleteCommentaire(){

  }


}
