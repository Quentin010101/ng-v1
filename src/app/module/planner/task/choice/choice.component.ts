import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Choice, Choices } from '../../../../model/planner/choice.model';
import { MapNumberString } from '../../../../model/utils.model';

@Component({
  selector: 'app-choice',
  standalone: true,
  imports: [],
  templateUrl: './choice.component.html',
  styleUrl: './choice.component.scss'
})
export class ChoiceComponent {
  @Input() choices!: Choices
  @Output() onChangeOutput = new EventEmitter<Choice>

  onChange(e: Event){
    let id = parseInt((e.target as HTMLInputElement).value)
    let choiceback = new Choice(this.choices.title)
    choiceback.data =  this.choices.data.find((data) => data.id == id) as MapNumberString
    this.onChangeOutput.emit(choiceback)
  }
}
