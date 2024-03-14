import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompartimentService } from '../../../../service/planner/compartiment.service';
import { Compartiment } from '../../../../model/planner/compartiment.model';

@Component({
  selector: 'app-creation',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './creation.component.html',
  styleUrl: './creation.component.scss'
})
export class CreationComponent {
  compartimentForm!: FormGroup
  newOrder: number | null = null

  constructor(private fb: FormBuilder, private _compartimentServcie: CompartimentService) {
    this.compartimentForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(){
    this._compartimentServcie.getlastOrder().subscribe(data=>{
      if(data)
      this.newOrder = data + 1
    })
  }

  private create(){
    if(this.newOrder && !this.compartimentForm.invalid){
      let comp = new Compartiment()
      comp.compartimentOrder = this.newOrder
      comp.name = this.compartimentForm.controls['name'].value
      console.log(comp)
      this._compartimentServcie.newcompartiment(comp).subscribe()
    }
  }

  public onSubmit(){
    this.create()
  }
}
