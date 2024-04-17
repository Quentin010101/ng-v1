import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Item } from '../../../../model/planner/item.model';
import { CheckComponent } from '../../../../core/shared/input/check/check.component';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextComponent } from '../../../../core/shared/input/text/text.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faTrashCan   } from '@fortawesome/free-regular-svg-icons';
import { faTrash, faPlus, faTag } from '@fortawesome/free-solid-svg-icons';
import { IconDeleteComponent } from '../../../../core/shared/icon/delete/icon-delete.component';
import { IconPenToSquareComponent } from '../../../../core/shared/icon/icon-pen-to-square/icon-pen-to-square.component';
import { ClickOutsideDirective } from '../../../../z-other/click-outside.directive';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { ChipComponent } from '../../../../core/shared/input/chip/chip.component';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [CheckComponent, ReactiveFormsModule,TextComponent, FontAwesomeModule, IconDeleteComponent,IconPenToSquareComponent,ClickOutsideDirective,CommonModule],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})
export class ItemsComponent {
  @Input() taskFomrGroup!: FormGroup
  faTrashCan=faTrashCan as IconProp
  faTrash=faTrash
  faPlus=faPlus
  faTag=faTag
  addItemDisabled:boolean = false
  inputFocus: Subject<boolean> = new Subject()


  ngOnInit(){
    this.itemsList.statusChanges.subscribe(result =>{
      if(result === 'VALID') this.addItemDisabled = false
    })
  }



  get itemsList(): FormArray { 
    return this.taskFomrGroup.get('items') as FormArray;
   }


  private addItem(item:Item){
    return new FormGroup({
      itemId: new FormControl(item.itemId),
      text: new FormControl(item.text, Validators.required),
      actif: new FormControl(item.actif),
    })
  }

  public saveItem(str: string,index: number){
    console.log("dirty")
    let item: Item = this.itemsList.at(index).value
    item.text = str
    this.itemsList.setControl(index,this.addItem(item))
    this.taskFomrGroup.markAsDirty()
  }

  public deleteItem(e:Event,index: number){
    console.log("dirty")
    e.stopPropagation()
    this.itemsList.removeAt(index)
    this.taskFomrGroup.markAsDirty()
  }

  public onCheck(checked: boolean, index: number){
    console.log("dirty")
    let item: Item = this.itemsList.at(index).value
    item.actif = checked
    this.itemsList.setControl(index,this.addItem(item))
    this.taskFomrGroup.markAsDirty()
  }

  public addNewItemControl(e:Event){
    console.log("t")
    let item = new Item()
    item.actif= false
    item.text=''
    this.itemsList.push(this.addItem(item))
    this.addItemDisabled = true
    setTimeout(()=>{
      this.inputFocus.next(true)
    }, 10)
  }

  public getActiveList(): number{
    return this.itemsList.getRawValue().filter((el)=> el.actif == true).length
  }


}
