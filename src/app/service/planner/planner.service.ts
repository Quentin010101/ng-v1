import { Injectable } from '@angular/core';
import { environnement } from '../../../environnement';
import { HttpClient } from '@angular/common/http';
import { TaskCreationRequest } from '../../model/planner/taskCreationRequest.model';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { ResponseObject } from '../../model/response/responseObjectDto.model';
import { Task } from '../../model/planner/task.model';
import {  ResponseDto } from '../../model/response/responseDto.model';
import { TaskContainer, TaskContainerTot } from '../../model/planner/taskContainer.model';
import { Compartiment } from '../../model/planner/compartiment.model';

@Injectable({
  providedIn: 'root'
})
export class PlannerService {
  url: string = environnement.backEndUrl + 'task/'
  $tasksContainer = new BehaviorSubject<TaskContainerTot>(new TaskContainerTot())

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
    let tasks: TaskContainerTot = this.$tasksContainer.value
    if(tasks != null && tasks.taskContainers != null && tasks.taskContainers.length > 0){
      this.$tasksContainer.next(tasks)
    }else{
      this.getAllTasks().subscribe(data => { 
        if(data.responseDto.executionStatus){
          let taskContainerArr: TaskContainerTot = new TaskContainerTot()
          data.object.forEach(task => {
            let taskCompId = task.compartiment.compartimentId
            let taskCompIdAlreadyExist = false
            taskContainerArr.taskContainers.forEach(elem =>{
              if(elem.compartimentId == taskCompId) {
                taskCompIdAlreadyExist = true
                elem.tasks.push(task)
              }
            })
            if(!taskCompIdAlreadyExist){
              let tasks: Task[] = []
              tasks.push(task)
              taskContainerArr.taskContainers.push( new TaskContainer(task.compartiment.compartimentId, tasks))
            }
          })
          this.$tasksContainer.next(taskContainerArr)
        }
      })
    }
  }

  public newTask(taskCreation: TaskCreationRequest): Observable<ResponseObject<Task>>{
    let compId = taskCreation.compartiment.compartimentId
    let tasks: Task[] = this.$tasksContainer.getValue().getTasksByCompId(compId)
    return this.createNewTask(taskCreation).pipe(
      tap(data => {
        let task = data.object
        tasks.push(task)
        let newArrayTasks: TaskContainerTot = new TaskContainerTot()
        newArrayTasks.taskContainers = this.$tasksContainer.value?.taskContainers.filter((element)=> element.compartimentId != compId )
        newArrayTasks.taskContainers.push(new TaskContainer(compId, tasks))
        this.$tasksContainer.next(newArrayTasks)
      })
    )
  }

  public update(task: Task): Observable<ResponseObject<Task>>{
    let compId = task.compartiment.compartimentId
    let tasks: Task[] = this.$tasksContainer.getValue().getTasksByCompId(compId)
    return this.updateTask(task).pipe(
      tap(data => {
        let newTasks: Task[] = tasks.filter((t)=> t.taskId != task.taskId)
        let newtask: Task = data.object
        newTasks.unshift(newtask)
        let newArrayTasks: TaskContainerTot = new TaskContainerTot()
        newArrayTasks.taskContainers = this.$tasksContainer.value?.taskContainers.filter((element)=> element.compartimentId != compId )
        newArrayTasks.taskContainers.push(new TaskContainer(compId, newTasks))
        this.$tasksContainer.next(newArrayTasks)
      })
    )
  }

  public updateOnDrop(task: Task, newComp: Compartiment): Observable<ResponseObject<Task>>{
    
    let oldCompId = task.compartiment.compartimentId
    console.log(oldCompId)
    let newCompId = newComp.compartimentId
    console.log(newCompId)
    task.compartiment = newComp

    let oldTasks: Task[] = this.$tasksContainer.getValue().getTasksByCompId(oldCompId)
    console.log(oldTasks)
    let newTasks: Task[] = this.$tasksContainer.getValue().getTasksByCompId(newCompId)
    console.log(newTasks)
    return this.updateTask(task).pipe(
      tap(data => {
        oldTasks = oldTasks.filter((t)=> t.taskId != task.taskId)
        let newtask: Task = data.object
        newTasks.push(newtask)
        let newArrayTasks: TaskContainerTot = new TaskContainerTot()
        newArrayTasks.taskContainers = this.$tasksContainer.getValue().taskContainers.filter((element)=> !(element.compartimentId in [oldCompId,newCompId]))
        newArrayTasks.taskContainers.push(new TaskContainer(newCompId, newTasks))
        newArrayTasks.taskContainers.push(new TaskContainer(oldCompId, oldTasks))
        this.$tasksContainer.next(newArrayTasks)
      })
    )
  }

  public delete(task: Task):Observable<ResponseDto>{
    let compId = task.compartiment.compartimentId
    let tasks: Task[] = this.$tasksContainer.getValue().getTasksByCompId(compId)
    return this.deleteTask(task.taskId).pipe(tap(data => {
      if(data.executionStatus){
        let newTasks: Task[] = tasks.filter((t)=> t.taskId != task.taskId)
        let newArrayTasks: TaskContainerTot = new TaskContainerTot()
        newArrayTasks.taskContainers = this.$tasksContainer.value?.taskContainers.filter((element)=> element.compartimentId != compId )
        newArrayTasks.taskContainers.push(new TaskContainer(compId, newTasks))
        this.$tasksContainer.next(newArrayTasks)
      }
    }))
  }

  public getTask(taskId: number):Task | null{
    return this.$tasksContainer.getValue().getTaskById(taskId)
  }

  public handleDroppedTask(task: Task, newCompId: number, newOrder: number){
    // this.$tasksContainer.
  }

}
