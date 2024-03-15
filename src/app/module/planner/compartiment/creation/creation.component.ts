import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompartimentService } from '../../../../service/planner/compartiment.service';
import { Compartiment } from '../../../../model/planner/compartiment.model';

@Component({
  selector: 'app-creation-compartiment',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './creation.component.html',
  styleUrl: './creation.component.scss'
})
export class CompartimentCreationComponent {
  compartimentForm!: FormGroup
  compartiments: Compartiment[] = []
  newOrder: number | null = null

  constructor(private fb: FormBuilder, private _compartimentServcie: CompartimentService) {
    this._compartimentServcie.$compartiment.subscribe(data => {
      this.compartiments = data
    })
    this.compartimentForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(){
  }

  private create(newOrder: number){
    if(!this.compartimentForm.invalid){
      let comp = new Compartiment()
      comp.compartimentOrder = newOrder
      comp.name = this.compartimentForm.controls['name'].value
      this._compartimentServcie.newcompartiment(comp).subscribe()
    }
  }

  public onSubmit(){
    let newArr = this.compartiments.map(a => a.compartimentOrder);
    this.create(Math.max(...newArr))
  }
}
