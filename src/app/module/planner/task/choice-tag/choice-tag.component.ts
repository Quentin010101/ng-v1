import {  Component, ElementRef, Input, ViewChild } from '@angular/core';
import { TagService } from '../../../../service/planner/tag.service';
import { Tag } from '../../../../model/planner/tag.model';
import { TextComponent } from '../../../../core/shared/input/text/text.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTag, faTags } from '@fortawesome/free-solid-svg-icons';
import { SelectComponent } from '../../../../core/shared/input/select/select.component';
import { ChipComponent } from '../../../../core/shared/input/chip/chip.component';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { ClickOutsideDirective } from '../../../../z-other/click-outside.directive';

@Component({
  selector: 'app-choice-tag',
  standalone: true,
  imports: [TextComponent,FontAwesomeModule,SelectComponent,ChipComponent, ReactiveFormsModule,CommonModule,ClickOutsideDirective],
  templateUrl: './choice-tag.component.html',
  styleUrl: './choice-tag.component.scss'
})
export class ChoiceTagComponent {
  @Input() taskFomrGroup!: FormGroup
  @ViewChild('button') buttonElement!: ElementRef
  inputOpen = false
  inputFocus: Subject<boolean> = new Subject();
  inputReset: Subject<boolean> = new Subject();
  faTag=faTag;faTags=faTags
  tagsList!: Tag[]

  constructor(private _tagService: TagService, private fb: FormBuilder){
    this._tagService.$tags.subscribe(data => 
      this.tagsList = data
    )
  }

  public filterTagList(tags: Tag[]): Tag[]{
    return tags.filter((el)=> {
      let test = true
      for(let i = 0; i < this.tags.value.length; i++){
        if(el.tagId == this.tags.value[i].tagId){
          test = false
        }
      }
      if(test) return el
    }
  )
  }

  ngOnInit(){
    this._tagService.init();
  }
  
  onNewTagInList(name:string){
    if(name.length > 0){
      let tag = new Tag()
      tag.name = name
      this._tagService.newTag(tag).subscribe()
    }
    this.inputOpen = false
    this.inputReset.next(true)

  }
  onTagSelected(tag: Tag){
    this.tags.push(this.addTagItem(tag))
    this.taskFomrGroup.markAsDirty()
  }

  onTagDelete(i: number){
    this.tags.removeAt(i)
    this.taskFomrGroup.markAsDirty()
  }

  onClickInputAdd(e: Event){
    e.stopPropagation()
    this.inputOpen = true
    this.inputFocus.next(true)
  }

  inputClickOutside(){
    this.inputOpen = false
  }

  private addTagItem(tag: Tag): FormGroup {
    return this.fb.group({
      tagId: new FormControl(tag.tagId),
      name: new FormControl(tag.name, Validators.required)
    });
  }

  get tags(): FormArray { return this.taskFomrGroup.get('tags') as FormArray; }
}
