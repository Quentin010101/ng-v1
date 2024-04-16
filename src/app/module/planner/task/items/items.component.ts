import { Component, Input } from '@angular/core';
import { Item } from '../../../../model/planner/item.model';
import { CheckComponent } from '../../../../core/shared/input/check/check.component';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextComponent } from '../../../../core/shared/input/text/text.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faTrashCan   } from '@fortawesome/free-regular-svg-icons';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { IconDeleteComponent } from '../../../../core/shared/icon/delete/icon-delete.component';
import { IconPenToSquareComponent } from '../../../../core/shared/icon/icon-pen-to-square/icon-pen-to-square.component';
import { ClickOutsideDirective } from '../../../../z-other/click-outside.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [CheckComponent, ReactiveFormsModule,TextComponent, FontAwesomeModule, IconDeleteComponent,IconPenToSquareComponent,ClickOutsideDirective,CommonModule],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})
export class ItemsComponent {
  @Input() items: Item[] = []
  @Input() taskFomrGroup!: FormGroup
  faTrashCan=faTrashCan as IconProp
  faTrash=faTrash
  faPlus=faPlus


  ngOnInit(){
  }

  get itemsList(): FormArray { return this.taskFomrGroup.get('items') as FormArray; }


  private addItem(item:Item){
    return new FormGroup({
      itemId: new FormControl(item.itemId),
      text: new FormControl(item.text, Validators.required),
      actif: new FormControl(item.actif),
    })
  }
  public deleteItem(e:Event,index: number){
    e.stopPropagation()
    this.itemsList.removeAt(index)
    this.taskFomrGroup.markAsDirty()
  }

  public onCheck(checked: boolean, index: number){
    let item: Item = this.itemsList.at(index).value
    this.itemsList.updateOn
    item.actif = checked
    this.itemsList.setControl(index,this.addItem(item))
  }

  public addNewItem(e:Event){
    console.log(this.itemsList.invalid)
    let item = new Item()
    item.actif= false
    item.text=''
    this.itemsList.push(this.addItem(item))
  }


}
