import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './date.component.html',
  styleUrl: './date.component.scss'
})
export class DateComponent {
  @ViewChild("input") input!: ElementRef
  @Input() date: Date | null = null
  @Output() dateEmit = new EventEmitter<Date>()
  today = new Date()
  faCalendar = faCalendar
  
  public onChange(e: Event){
    this.date= new Date(this.input.nativeElement.value)
    this.dateEmit.emit(this.date)
  }

  public cancel(e: Event){
    e.stopPropagation()
  }
}
