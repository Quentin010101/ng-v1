import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @ViewChild('content') content!: ElementRef
  @ViewChild('element') element!: ElementRef

  public onmousemove(e: MouseEvent){
    let rect = this.content.nativeElement.getBoundingClientRect()
    let width = rect.right - rect.left
    let height = rect.bottom - rect.top
    let x = e.clientX - rect.left - width;
    
    let y = e.clientY - rect.top - height;
    gsap.to(this.element.nativeElement, {x: x, y:y ,duration: 0.3, ease: 'power4'} )

  }
}
