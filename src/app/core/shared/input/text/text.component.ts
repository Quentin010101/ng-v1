import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';


@Component({
  selector: 'app-text',
  standalone: true,
  imports: [],
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss'
})
export class TextComponent {
  @ViewChild("input") input!:ElementRef
  @ViewChild("icon") icon!:ElementRef
  @Output() inputEmitter = new EventEmitter<string>()
  @Input() type: string = "text"
  @Input() placeholder: string = ""

  public onblur(e: Event){
    this.removeClass("onfocus")
  }

  public onfocus(e: Event){
    this.addClass("onfocus")
  }

  public oninput(e: Event){
    this.inputEmitter.emit((e.target as HTMLInputElement).value)
  }

  public onclick(){
    let element = this.icon.nativeElement as HTMLElement
    element.classList.add('wiggle')
    console.log("click")
    setTimeout(()=> { element.classList.remove('wiggle') }, 410)
  }

  private addClass(str: string){
    let element = this.input.nativeElement as HTMLInputElement
    element.classList.add(str)
  }
  private removeClass(str: string){
    let element = this.input.nativeElement as HTMLInputElement
    element.classList.remove(str)
  }
}
