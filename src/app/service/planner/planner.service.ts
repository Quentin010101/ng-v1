import { Injectable } from '@angular/core';
import { environnement } from '../../../environnement';
import { HttpClient } from '@angular/common/http';
import { TaskCreationRequest } from '../../model/planner/taskCreationRequest.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ResponseObject } from '../../model/response/responseObjectDto.model';
import { Task } from '../../model/planner/task.model';
import { ResponseDto } from '../../model/response/responseDto.model';
import { TaskContainer } from '../../model/planner/taskContainer.model';

@Injectable({
  providedIn: 'root',
})
export class PlannerService {
  url: string = environnement.backEndUrl + 'task/';
  $tasksContainer = new BehaviorSubject<Map<number, Task[]>>(new Map());

  constructor(private http: HttpClient) { }

  private createNewTask(
    task: TaskCreationRequest
  ): Observable<ResponseObject<Task>> {
    return this.http.post<ResponseObject<Task>>(this.url + 'create', task);
  }

  private deleteTask(id: number): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.url + 'delete/' + id);
  }

  private updateTask(task: Task): Observable<ResponseObject<Task>> {
    return this.http.post<ResponseObject<Task>>(this.url + 'update', task);
  }
  private updateDragEvent(tasks: Task[][]): Observable<ResponseObject<Task[]>> {
    return this.http.post<ResponseObject<Task[]>>(this.url + 'updateDragEvent', tasks);
  }

  private getAllTasks(): Observable<ResponseObject<Task[]>> {
    return this.http.get<ResponseObject<Task[]>>(this.url + 'read');
  }

  public init() {
    let tasks = this.$tasksContainer.value;
    if (tasks != null && tasks.size > 0) {
      this.$tasksContainer.next(tasks);
    } else {
      this.getAll();
    }
  }
  private getAll() {
    this.getAllTasks().subscribe((data) => {
      if (data.responseDto.executionStatus) {
        this.handleTasks(data)
      }
    });
  }

  private handleTasks(data: ResponseObject<Task[]>) {
    let tasksMap = new Map<number, Task[]>();
    data.object.forEach((task) => {
      let taskCompId = task.compartiment.compartimentId;
      let arr: Task[] = [];
      if (tasksMap.get(taskCompId)) {
        arr = tasksMap.get(taskCompId) as Task[];
      }
      arr.push(task);
      tasksMap.set(taskCompId, arr);
    });
    this.$tasksContainer.next(tasksMap);
  }

  public newTask(
    taskCreation: TaskCreationRequest
  ): Observable<ResponseObject<Task>> {
    return this.createNewTask(taskCreation).pipe(
      tap((data) => {
        if (!data.responseDto.executionStatus)
          throw new Error('Task creation failed');
        this.updateMapWithNewTask(data);
      })
    );
  }

  public update(task: Task): Observable<ResponseObject<Task>> {
    return this.updateTask(task).pipe(
      tap((data) => {
        if (!data.responseDto.executionStatus)
          throw new Error('Task update failed');
        this.updateMapWithNewTask(data);
      })
    );
  }

  private updateOnDrop(tasksArray: Task[][]) {
    return this.updateDragEvent(tasksArray).subscribe(data => {
      if (data.responseDto.executionStatus) {
        this.handleTasks(data)
      }
    })
  }

  private handleReorder(tasks: Task[]) {
    let i = 1;
    tasks.forEach((el) => {
      el.taskorder = i
      i++;
    })
    return tasks
  }

  public handleReorderSingleReorder(tasks: Task[]) {
    let newTasks = this.handleReorder(tasks)
    this.updateOnDrop([newTasks])
  }
  public handleMultipleReorder(tasksArray: Task[][]) {
    this.updateOnDrop(tasksArray.map(el => this.handleReorder(el)))
  }

  public delete(task: Task): Observable<ResponseDto> {
    return this.deleteTask(task.taskId).pipe(
      tap((data) => {
        if (data.executionStatus) {
          let taskContainer = this.$tasksContainer.value
          let taskArray: Task[] | undefined = taskContainer.get(task.compartiment.compartimentId)
          if (taskArray) {
            let taskResult = taskArray.filter((el) => el.taskId != task.taskId)
            taskContainer.set(task.compartiment.compartimentId, taskResult);
            this.$tasksContainer.next(taskContainer);
          } else {
            throw new Error("Can 't delete item cause compartiment not found.")
          }
        }
      })
    );
  }

  public getTasksByCompId(id: number): Task[] {
    let arr = this.$tasksContainer.value.get(id);
    if (arr) return arr
    return []
  }
  public getTasksByCompIdOrdered(id: number): Task[] {
    let arr = this.getTasksByCompId(id);
    return arr.sort((a,b) => a.taskorder -b.taskorder)

  }

  public getTaskById(id: number): Task | null {
    let taskContainer = this.$tasksContainer.value;
    let taskFound: Task | null = null;
    for (let value of taskContainer.values()) {
      for (let i = 0; i < value.length; i++) {
        if (value[i].taskId == id) {
          taskFound = value[i];
          break;
        }
      }
    }
    return taskFound;
  }

  private updateMapWithNewTask(data: ResponseObject<Task>) {
    let compartimentId = data.object.compartiment.compartimentId;
    let tasksMap = this.$tasksContainer.value;
    let arrayTasks: Task[] | undefined = tasksMap.get(compartimentId);

    if (!arrayTasks) arrayTasks = [];
    let filteredArray = arrayTasks.filter((el) => el.taskId != data.object.taskId)
    filteredArray.push(data.object);
    tasksMap.set(compartimentId, filteredArray);
    this.$tasksContainer.next(tasksMap);
  }

  private log(tasks: Task[] | undefined | null) {
    if (!tasks) return
    console.log("log start")
    tasks.forEach((el) => {
      console.log(el)
    })
  }
}
