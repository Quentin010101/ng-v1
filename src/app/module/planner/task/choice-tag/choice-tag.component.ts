import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TagService } from '../../../../service/planner/tag.service';
import { Tag } from '../../../../model/planner/tag.model';
import { TextComponent } from '../../../../core/shared/input/text/text.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTag, faTags } from '@fortawesome/free-solid-svg-icons';
import { SelectComponent } from '../../../../core/shared/input/select/select.component';
import { Task } from '../../../../model/planner/task.model';
import { ChipsComponent } from '../../../../core/shared/input/chips/chips.component';
import { PlannerService } from '../../../../service/planner/planner.service';
@Component({
  selector: 'app-choice-tag',
  standalone: true,
  imports: [TextComponent,FontAwesomeModule,SelectComponent,ChipsComponent],
  templateUrl: './choice-tag.component.html',
  styleUrl: './choice-tag.component.scss'
})
export class ChoiceTagComponent {
  @Input() task!: Task
  @Output() onTaskTagDelete = new EventEmitter<number>()
  faTag=faTag;faTags=faTags
  tags!: Tag[]

  constructor(private _tagService: TagService){
    this._tagService.$tags.subscribe(data => this.tags = data)
  }
  ngOnInit(){
    this._tagService.init();
  }

  onTagDelete(i: number){
    this.onTaskTagDelete.emit(i)
  }
}
