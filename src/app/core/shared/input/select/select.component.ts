import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {
  @Input() object!: any[]
  @Input() default!: string
  @Output() onSelectOutput = new EventEmitter<any>()

  onSelect(e:Event){
    let idSelected = (e.target as HTMLInputElement).value
    this.onSelectOutput.emit(this.object[parseInt(idSelected)])
  }

}
