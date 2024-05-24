import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Score } from '../../../../model/games/score.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'snake-setting',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.scss'
})
export class SnakeSettingComponent {
  @Input() result:number = 0
  @Input() highScore:number = 0
  @Input() form!: FormGroup

  ngOnInit(){
    console.log(this.form)
  }

}

