import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  auth = inject(AuthenticationService)
  pseudo = this.auth.getPseudo()
  transitionOn: boolean = true

  constructor(private route: ActivatedRoute){
    console.log(route.snapshot)
  }
    // setTimeout(()=> { this.transitionOn = false}, 1000)
  
}
