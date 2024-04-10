import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompartimentService } from '../../../../service/planner/compartiment.service';
import { Compartiment } from '../../../../model/planner/compartiment.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faPen } from '@fortawesome/free-solid-svg-icons';
import { translateRight } from '../../../../z-other/transition';
import { ClickOutsideDirective } from '../../../../z-other/click-outside.directive';
import { TextComponent } from '../../../../core/shared/input/text/text.component';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-creation-compartiment',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule,ClickOutsideDirective,TextComponent],
  templateUrl: './creation.component.html',
  styleUrl: './creation.component.scss',
  animations: [translateRight]
})
export class CompartimentCreationComponent {
  @ViewChild('input') inputElement!:TextComponent
  compartimentForm!: FormGroup
  compartiments: Compartiment[] = []
  newOrder: number | null = null
  faPlus = faPlus; faPen=faPen
  open: boolean = false
  focusValue: Subject<boolean> = new Subject();
  resetValue: Subject<boolean> = new Subject();

  constructor(private fb: FormBuilder, private _compartimentServcie: CompartimentService) {
    this._compartimentServcie.$compartiment.subscribe(data => {
      this.compartiments = data
    })
    this.compartimentForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  private create(newOrder: number){
    if(!this.compartimentForm.invalid){
      let comp = new Compartiment()
      comp.compartimentOrder = newOrder
      comp.name = this.compartimentForm.controls['name'].value
      this._compartimentServcie.newcompartiment(comp).subscribe()
      this.open = false
      this.compartimentForm.reset()
    }
  }

  public onSubmit(){
    let newArr = this.compartiments.map(a => a.compartimentOrder);
    this.create(Math.max(...newArr))
    this.resetValue.next(true)
  }

  public newCompartimentShow(){
    this.open = true
    this.focusValue.next(true)
  }

  public reset(e: Event){
    this.open = false;
    this.resetValue.next(true)
  }

  public onCompartimentChange(str: string){
    this.compartimentForm.controls['name'].setValue(str)
  }
}
