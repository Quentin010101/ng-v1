import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


export class DragInfo {
  constructor(before: boolean, id: string) {
    this.before = before
    this.id = id
  }
  before!: boolean
  id!: string
}
export class StartInfo {
  constructor(compId: number, taskId: number, height: string) {
    this.compId = compId
    this.taskId = taskId
    this.taskHeight = height
  }
  compId!: number
  taskId!: number
  taskHeight!: string
}

export class NewComp {
  constructor(newCompId: number, oldCompId: number) {
    this.newCompId = newCompId
    this.oldCompId = oldCompId
  }
  newCompId!: number
  oldCompId!: number
}

export class DragOver {
  constructor(compartiment: HTMLElement, event: DragEvent) {
    this.compartiment = compartiment
    this.event = event
  }
  compartiment!: HTMLElement
  event!: DragEvent
}

export class TempElement {
  constructor(element: HTMLElement, before: boolean) {
    this.element = element
    this.before = before
  }
  element!: HTMLElement
  before!: boolean
}

@Injectable({
  providedIn: 'root'
})
export class DragDropService {
  compDraggedOver: number | null = null
  taskDraggedId: number | null = null
  taskDraggedHeight: string | null = null
  tempActif: boolean = false
  tempElement: TempElement | null = null
  order: number | null =null

  $isBeingDragged = new Subject<number | null>()
  $draggedEnd = new Subject<number | null>()
  $hasStartedBeingDragged = new Subject<StartInfo | null>()
  $onEnter = new Subject<number | null>()
  $onNewComp = new Subject<NewComp>()
  $normalOpacity = new Subject<boolean>()
  $dragOver = new Subject<DragOver>()
  $removeTemp = new Subject<boolean>()

  constructor() {
    this.$hasStartedBeingDragged.subscribe(d =>  {
      if(d){
        this.compDraggedOver = d.compId
        this.taskDraggedId = d.taskId
        this.taskDraggedHeight = d.taskHeight
      }
    }
    )
    this.$onEnter.subscribe(d => {
      if (d) {
        if (this.compDraggedOver && d != this.compDraggedOver) {
          this.$onNewComp.next(new NewComp(d, this.compDraggedOver))
        }
        this.compDraggedOver = d
      }
    })
    this.$dragOver.subscribe(e => {
      this.handleDrag(e)
    })
  }

  private handleDrag(e: DragOver) {
    if(!this.isElementValid(e.event)) {
      this.$removeTemp.next(true)
      return
    }
    console.log("handle drag")
    let compartiment = e.compartiment
    let event = e.event
    let cursorY = event.y

    let childElementArray = Array.from(compartiment.childNodes)

    let choosenElement: HTMLElement | null = null
    for (let i = 0; i < childElementArray.length; i++) {
      let element = childElementArray[i]
      if (element instanceof HTMLElement) {
        if (element.getAttribute("taskid")) {
          let rect = element.getBoundingClientRect()
          if (this.isBettween(cursorY, rect.top, rect.bottom)) {
            choosenElement = element
            break;
          }
        }
      }
    }

    if (choosenElement && compartiment) {
      let rectChoosen = choosenElement.getBoundingClientRect()
      
      let before = Math.abs(rectChoosen.top - cursorY) < Math.abs(rectChoosen.bottom - cursorY)
      if(this.isFocuseChanged(choosenElement, before)){
        this.$removeTemp.next(true)
        let temp = this.createElement(before, choosenElement.getAttribute("order") as string)
        if (before) {
          compartiment.insertBefore(temp, choosenElement)
        } else {
          choosenElement.parentNode?.insertBefore(temp, choosenElement.nextSibling)
        }
        this.tempElement = new TempElement(choosenElement, before)
      }

    }else if(compartiment && (e.event.target as HTMLElement).getAttribute("id") != "temp"){
      this.$removeTemp.next(true)
      let lastChildOrder = null
      if(compartiment.lastElementChild)
        lastChildOrder = compartiment.lastElementChild.getAttribute("order")
      
      let temp = this.createElement(null, lastChildOrder)
      compartiment.appendChild(temp)
    }


  }

  private isFocuseChanged(choosenElement: HTMLElement, before: boolean): boolean{
    if(!this.tempElement) return true
    if(this.tempElement.element != choosenElement || !((this.tempElement.before && before) || (!this.tempElement.before && !before))){
      return true
    }
    return false
  }

  private createElement(before: boolean | null, elementOrder: string | null): HTMLElement {
    let newTemp = document.createElement("div")
    if(this.taskDraggedHeight){
      newTemp.style.height = this.taskDraggedHeight;
    }else{
      newTemp.style.height = "125px"
    }
    newTemp.style.borderRadius = "0.25rem";
    newTemp.classList.add("temp-item")
    newTemp.setAttribute("id", "temp")

    if(before == null){
      if(elementOrder){
        this.order = parseInt(elementOrder) + 1
      }else{
        this.order = 1
      }
    }else if(before){
      this.order = parseInt(elementOrder as string)
    }else{
      this.order = parseInt(elementOrder as string) + 1
    }

    return newTemp
  }

  private isBettween(x: number, top: number, bottom: number): boolean {
    if (x <= bottom && x >= top) return true
    return false
  }

  public getTempElement(compartiment: HTMLElement) {
    let childElementArray = Array.from(compartiment.childNodes)

    let tempElement: HTMLElement | null = null
    for (let i = 0; i < childElementArray.length; i++) {
      let element = childElementArray[i]
      if (element instanceof HTMLElement) {
        if (element.getAttribute("id") == "temp") {
          tempElement = element
          break;
        }
      }
    }
    return tempElement
  }

  public deleteTmpElement(compartiment: HTMLElement){
    this.tempElement = null
    let el = this.getTempElement(compartiment)
    if(el) el.remove()
  }

  private isElementValid(e: DragEvent):boolean{
    let el = e.target
    if(el instanceof HTMLElement){
      if(el.closest("[taskid]")) return true
      if(el.getAttribute("id") == "temp") return true
    }
    return false
  }

  public reset(){
    this.compDraggedOver = null
    this.taskDraggedId = null
    this.taskDraggedHeight = null
    this.tempActif = false
    this.tempElement = null
  }

}
