import { Injectable } from '@angular/core';
import { environnement } from '../../environnement';
import { HttpClient } from '@angular/common/http';
import { TaskCreationRequest } from '../model/planner/taskCreationRequest.model';
import { Observable } from 'rxjs';
import { ResponseObject } from '../model/response/responseObject.model';
import { Compartiment } from '../model/planner/compartiment.model';
import { Task } from '../model/planner/task.model';
import { Response } from '../model/response/response.model';

@Injectable({
  providedIn: 'root'
})
export class PlannerService {
  url: string = environnement.backEndUrl + '/task/'

  constructor(private http: HttpClient) { }

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
}
