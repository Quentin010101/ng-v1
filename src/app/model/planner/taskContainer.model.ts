import { Task } from "./task.model";

export class TaskContainer{
    constructor(compId: number, tasks: Task[]){
        this.compartimentId = compId
        this.tasks = tasks
    }
    tasks!: Task[]
    compartimentId!: number
}

