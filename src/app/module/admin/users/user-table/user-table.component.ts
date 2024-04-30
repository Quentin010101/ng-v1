import { Component, Input } from '@angular/core';
import { User } from '../../../../model/auth/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TableComponent } from '../../../../core/shared/table/table.component';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss'
})
export class UserTableComponent {
  @Input() users!: User[]
  arrayHeader = ['id', 'pseudo','role', 'status']
  arrayContent = []

  constructor(private router: Router,private activatedRoute: ActivatedRoute){

  }

  public filter(users: User[]): string[][]{
    let arrTot: string[][] = []
    users.forEach((user) =>{
      let arr = []
      arr.push(user.userId.toString())
      arr.push(user.pseudo)
      arr.push(user.role)
      arr.push(user.accountNonLocked? 'OK' : 'Locked')
      arrTot.push(arr)
    })
    return arrTot
  }

  userClick(user: User){
    this.router.navigate(['user'], {relativeTo: this.activatedRoute, state:{
      user: user
    }});
  }

}
