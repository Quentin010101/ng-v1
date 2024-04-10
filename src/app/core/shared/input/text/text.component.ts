import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss'
})
export class TextComponent {
  @ViewChild("input") input!:ElementRef
  @ViewChild("container") container!:ElementRef
  @ViewChild("icon") icon!:ElementRef
  @Output() inputEmitter = new EventEmitter<string>()
  @Input() type: string = "text"
  @Input() placeholder: string = ""
  @Input() size: string = "md"
  @Input() focus!: Subject<boolean>;
  @Input() reset!: Subject<boolean>;

  ngOnInit(){
    if(this.focus){
      this.focus.subscribe(v => { 
        this.input.nativeElement.focus()
      })
    }
    if(this.reset){
      this.reset.subscribe(v => { 
        this.input.nativeElement.value = ''
      })
    }

  }

  public onblur(e: Event){
    this.removeClass("onfocus")
  }

  public onfocus(e: Event){
    this.addClass("onfocus")
    let element = this.icon.nativeElement as HTMLElement
    element.classList.add('wiggle')
    setTimeout(()=> { element.classList.remove('wiggle') }, 410)
  }

  public oninput(e: Event){
    this.inputEmitter.emit((e.target as HTMLInputElement).value)
  }

  private addClass(str: string){
    let element = this.container.nativeElement as HTMLElement
    element.classList.add(str)
  }
  private removeClass(str: string){
    let element = this.container.nativeElement as HTMLElement
    element.classList.remove(str)
  }
}
