import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[clickOutside]',
  standalone: true
})
export class ClickOutsideDirective {

  @Output() clickOutside: EventEmitter<any> = new EventEmitter();

  constructor(private _elementRef: ElementRef) {
  }

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick($event: any, targetElement: any) {
    $event.stopPropagation()
    const isClickedInside = this._elementRef.nativeElement.contains(targetElement);
    if (!isClickedInside) {
      this.clickOutside.emit($event);
    }
  }

}
