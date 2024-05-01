import { Component, Input } from '@angular/core';
import { User } from '../../../../model/auth/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TableComponent, TableContent } from '../../../../core/shared/table/table.component';
import { Utils } from '../../../../z-other/utils';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss'
})
export class UserTableComponent {
  @Input() users!: User[]
  arrayHeader = ['id', 'pseudo','role', 'status', 'last conection']


  constructor(private router: Router,private activatedRoute: ActivatedRoute){

  }

  public filter(users: User[]): TableContent[] {
    let contents: TableContent[] = []
    users.forEach((user) =>{
      console.log(user.dateLastConnection)
      let arr = []
      arr.push(user.userId.toString())
      arr.push(user.pseudo)
      arr.push(user.role)
      arr.push(user.accountNonLocked? 'OK' : 'Locked')
      arr.push(user.dateLastConnection? 
        Utils.dateToDateString(user.dateLastConnection) + " " + Utils.dateToTimeString(user.dateLastConnection)
        : 'Never Logged')
      let content = new TableContent()
      content.content = arr
      content.id = user.userId
      contents.push(content)
    })
    return contents
  }

  onUserClick(id: number){
    let user: User | undefined = this.users.find((el)=> el.userId == id)
    if(user){
      this.router.navigate(['user'], {relativeTo: this.activatedRoute, state:{
        user: user
      }});
    }
  }

}
