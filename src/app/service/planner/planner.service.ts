import { Injectable } from '@angular/core';
import { environnement } from '../../../environnement';
import { HttpClient } from '@angular/common/http';
import { TaskCreationRequest } from '../../model/planner/taskCreationRequest.model';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { ResponseObject } from '../../model/response/responseObjectDto.model';
import { Task } from '../../model/planner/task.model';
import {  ResponseDto } from '../../model/response/responseDto.model';

@Injectable({
  providedIn: 'root'
})
export class PlannerService {
  url: string = environnement.backEndUrl + 'task/'
  $tasks = new BehaviorSubject<Task[]>([])

  constructor(private http: HttpClient) { }

  private createNewTask(task: TaskCreationRequest): Observable<ResponseObject<Task>>{
    return this.http.post<ResponseObject<Task>>(this.url + 'create', task)
  }

  private deleteTask(id: number):Observable<ResponseDto>{
    return this.http.get<ResponseDto>(this.url + 'delete/' + id)
  }

  private updateTask(task: Task): Observable<ResponseObject<Task>>{
    return this.http.post<ResponseObject<Task>>(this.url + 'update', task)
  }

  private getAllTasks(): Observable<ResponseObject<Task[]>>{
    return this.http.get<ResponseObject<Task[]>>(this.url + 'read')
  }


  public init(){
    let tasks: Task[] = this.$tasks.value
    if(tasks != null && tasks.length > 0){
      this.$tasks.next(tasks)
    }else{
      this.getAllTasks().subscribe(data => { 
        if(data.responseDto.executionStatus)
        this.$tasks.next(data.object)
      })
    }
  }

  public newTask(taskCreation: TaskCreationRequest): Observable<ResponseObject<Task>>{
    let tasks: Task[] = this.$tasks.value
    return this.createNewTask(taskCreation).pipe(
      tap(data => {
        let task = data.object
        tasks.unshift(task)
        this.$tasks.next(tasks)
      })
    )
  }

  public update(task: Task): Observable<ResponseObject<Task>>{
    console.log(task)
    let tasks: Task[] = this.$tasks.value
    return this.updateTask(task).pipe(
      tap(data => {
        let newTasks = tasks.filter((t)=> t.taskId != task.taskId)
        let newtask = data.object
        newTasks.unshift(newtask)
        this.$tasks.next(newTasks)
      })
    )
  }

  public delete(id: number):Observable<ResponseDto>{
    let tasks: Task[] = this.$tasks.value
    return this.deleteTask(id).pipe(tap(data => {
      if(data.executionStatus){
        this.$tasks.next(tasks.filter(item => item.taskId != id))
      }
    }))
  }

}
