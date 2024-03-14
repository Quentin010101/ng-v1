import { Injectable } from '@angular/core';
import { environnement } from '../../../environnement';
import { HttpClient } from '@angular/common/http';
import { TaskCreationRequest } from '../../model/planner/taskCreationRequest.model';
import { Observable, of, tap } from 'rxjs';
import { ResponseObject } from '../../model/response/responseObject.model';
import { Compartiment } from '../../model/planner/compartiment.model';
import { Task } from '../../model/planner/task.model';
import { Response } from '../../model/response/response.model';
import { CacheService } from '../cache.service';

@Injectable({
  providedIn: 'root'
})
export class PlannerService {
  url: string = environnement.backEndUrl + 'task/'
  cacheName: string = 'tasks'

  constructor(private http: HttpClient, private _cacheService: CacheService) { }

  private createNewTask(task: TaskCreationRequest): Observable<ResponseObject<Task>>{
    return this.http.post<ResponseObject<Task>>(this.url + 'create', task)
  }

  private deleteTask(id: number):Observable<Response>{
    return this.http.get<Response>(this.url + 'delete/' + id)
  }

  private updateTask(task: Task): Observable<ResponseObject<Task>>{
    return this.http.post<ResponseObject<Task>>(this.url + 'update', task)
  }

  private getAllTasks(): Observable<ResponseObject<Task[]>>{
    return this.http.get<ResponseObject<Task[]>>(this.url + 'read')
  }

  public getAll(): Observable<ResponseObject<Task[]>>{
    let tasks: Task[] = this._cacheService.get(this.cacheName)
    if(tasks != null && tasks.length > 0) return of(new ResponseObject(new Response("", true), tasks))
    return this.getAllTasks()
  }

  public newTask(taskCreation: TaskCreationRequest): Observable<ResponseObject<Task>>{
    let tasks: Task[] = this._cacheService.get(this.cacheName)
    return this.createNewTask(taskCreation).pipe(
      tap(data => {
        let task = data.object
        tasks.push(task)
        this.updateCache(tasks)
      })
    )
  }

  public update(task: Task): Observable<ResponseObject<Task>>{
    let tasks: Task[] = this._cacheService.get(this.cacheName)
    return this.updateTask(task).pipe(
      tap(data => {
        let task = data.object
        tasks.push(task)
        this.updateCache(tasks)
      })
    )
  }

  public delete(id: number):Observable<Response>{
    let tasks: Task[] = this._cacheService.get(this.cacheName)
    return this.deleteTask(id).pipe(tap(data => {
      if(data.executionStatus){
        tasks.filter(item => item.taskId != id)
        this.updateCache(tasks)
      }
    }))
  }

  private updateCache(tasks: Task[]){
    this._cacheService.clear(this.cacheName)
    this._cacheService.set(this.cacheName, tasks)
  }
}
