import { Injectable } from '@angular/core';
import { environnement } from '../../../environnement';
import { HttpClient } from '@angular/common/http';
import { TaskCreationRequest } from '../../model/planner/taskCreationRequest.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ResponseObject } from '../../model/response/responseObjectDto.model';
import { Task } from '../../model/planner/task.model';
import {  ResponseDto } from '../../model/response/responseDto.model';
import { TaskContainer } from '../../model/planner/taskContainer.model';

@Injectable({
  providedIn: 'root'
})
export class PlannerService {
  url: string = environnement.backEndUrl + 'task/'
  $tasksContainer = new BehaviorSubject<Map<number, Task[]>>(new Map())

  constructor(private http: HttpClient) { 
  }

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


  public init(forced: boolean = false){
    let tasks: TaskContainer[] = this.$tasksContainer.value
    if(tasks != null && tasks.length > 0 && !forced){
      this.$tasksContainer.next(tasks)
    }else{
      this.getAllTasks().subscribe(data => { 
        if(data.responseDto.executionStatus){
          let taskContainerArr: TaskContainer[] = []
          
          data.object.forEach(task => {
            let taskCompId = task.compartiment.compartimentId
            let taskCompIdAlreadyExist = false
            taskContainerArr.forEach(elem =>{
              if(elem.compartimentId == taskCompId) {
                taskCompIdAlreadyExist = true
                elem.tasks.push(task)
              }
            })
            if(!taskCompIdAlreadyExist){
              let tasks: Task[] = []
              tasks.push(task)
              taskContainerArr.push( new TaskContainer(task.compartiment.compartimentId, tasks))
            }
          })
          this.$tasksContainer.next(taskContainerArr)
        }
      })
    }
  }

  public newTask(taskCreation: TaskCreationRequest): Observable<ResponseObject<Task>>{
    let compId = taskCreation.compartiment.compartimentId
    let tasks: Task[] = this.getTasksByCompId(compId)
    return this.createNewTask(taskCreation).pipe(
      tap(data => {
        let task = data.object
        tasks.push(task)
        let newArrayTasks: TaskContainer[] = this.$tasksContainer.value?.filter((element)=> element.compartimentId != compId )
        newArrayTasks.push(new TaskContainer(compId, tasks))
        this.$tasksContainer.next(newArrayTasks)
      })
    )
  }

  public update(task: Task): Observable<ResponseObject<Task>>{
    let compId = task.compartiment.compartimentId
    let tasks: Task[] = this.getTasksByCompId(compId)
    return this.updateTask(task).pipe(
      tap(data => {
        let newTasks: Task[] = tasks.filter((t)=> t.taskId != task.taskId)
        let newtask: Task = data.object
        newTasks.unshift(newtask)
        let newArrayTasks: TaskContainer[] = this.$tasksContainer.value?.filter((element)=> element.compartimentId != compId )
        newArrayTasks.push(new TaskContainer(compId, newTasks))
        this.$tasksContainer.next(newArrayTasks);
      })
    )
  }

  public delete(task: Task):Observable<ResponseDto>{
    let compId = task.compartiment.compartimentId
    let tasks: Task[] = this.getTasksByCompId(compId)
    return this.deleteTask(task.taskId).pipe(tap(data => {
      if(data.executionStatus){
        let newTasks: Task[] = tasks.filter((t)=> t.taskId != task.taskId)
        let newArrayTasks: TaskContainer[] = this.$tasksContainer.value?.filter((element)=> element.compartimentId != compId )
        newArrayTasks.push(new TaskContainer(compId, newTasks))
        this.$tasksContainer.next(newArrayTasks)
      }
    }))
  }


  public getTasksByCompId(id:number){
    let newTasks: Task[] = []
    this.$tasksContainer.value.forEach((element)=>{
        if(element.compartimentId == id){
            newTasks = element.tasks
        }
    })
    return newTasks
}

  public getTaskById(id: number): Task | null{
    let task: Task | null = null
    this.$tasksContainer.value.forEach((element)=>{
        element.tasks.forEach(elm =>{
            if(elm.taskId == id) task = elm
        })
    })
    return task
}

}
