import { Component, Input } from '@angular/core';
import { Commentaire } from '../../../../model/planner/commentaire.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-commentaires',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './commentaires.component.html',
  styleUrl: './commentaires.component.scss'
})
export class CommentairesComponent {
  @Input() commentaires: Commentaire[] = []
}
