import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faExclamation, faCircle, faCircleHalfStroke, faTemperatureEmpty, faTemperatureQuarter, faTemperatureHalf, faTemperatureThreeQuarters, faTemperatureFull  } from '@fortawesome/free-solid-svg-icons';
import {  faCircle as faCircle2, faBell  } from '@fortawesome/free-regular-svg-icons';
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { TooltipComponent } from '../../../../core/shared/tooltip/tooltip.component';
import { EnumerationService } from '../../../../service/planner/enumeration.service';
import { MapNumberString } from '../../../../model/utils/utils.model';

@Component({
  selector: 'app-show-choice',
  standalone: true,
  imports: [FontAwesomeModule, TooltipComponent],
  templateUrl: './show-choice.component.html',
  styleUrl: './show-choice.component.scss'
})
export class ShowChoiceComponent {
  @Input() progression!: number
  @Input() importance!: number
  importanceB!: MapNumberString[]
  progressionB!: MapNumberString[]

  constructor(private _enumService:EnumerationService){
    this._enumService.$importances.subscribe(data => this.importanceB = data)
    this._enumService.$progressions.subscribe(data => this.progressionB = data)
  }

  ngOnInit(){
    this._enumService.init()
  }

  public getImportance(id:number): string{
    let result:string = ''
    this.importanceB.forEach((el)=>{
      if(el.id == id) result = el.text
    })
    return result
  }
  public getProgression(id:number): string{
    let result:string = ''
    this.progressionB.forEach((el)=>{
      if(el.id == id) result = el.text
    })
    return result
  }

  faExclamation=faExclamation
  faBell=faBell as IconProp
  faCircle=faCircle
  faCircle2=faCircle2 as IconProp
  faCircleHalfStroke=faCircleHalfStroke

  faTemperatureHalf=faTemperatureHalf
  faTemperatureEmpty=faTemperatureEmpty
  faTemperatureQuarter=faTemperatureQuarter
  faTemperatureFull=faTemperatureFull

}
