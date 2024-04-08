import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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
  @Input() date!: Date
  today = new Date()
  faCalendar = faCalendar
  
  public onChange(e: Event){

  }

  public cancel(e: Event){
    e.stopPropagation()
  }
}
