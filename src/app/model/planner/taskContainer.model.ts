import { Task } from "./task.model";

export class TaskContainer{
    constructor(compId: number, tasks: Task[]){
        this.compartimentId = compId
        this.tasks = tasks
    }
    tasks!: Task[]
    compartimentId!: number
}

export class TaskContainerTot{
    taskContainers: TaskContainer[] = []

    getTasksByCompId(id:number){
        let newTasks: Task[] = []
        this.taskContainers.forEach((element)=>{
            if(element.compartimentId == id){
                newTasks = element.tasks
            }
        })
        return newTasks
    }

    getTaskById(id: number): Task | null{
        let task: Task | null = null
        this.taskContainers.forEach((element)=>{
            element.tasks.forEach(elm =>{
                if(elm.taskId == id) task = elm
            })
        })
        return task
    }
}