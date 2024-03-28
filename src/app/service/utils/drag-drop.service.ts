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
  constructor(compId: number, taskId: number) {
    this.compId = compId
    this.taskId = taskId
  }
  compId!: number
  taskId!: number
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
  tempActif: boolean = false
  tempElement: TempElement | null = null

  $isBeingDragged = new Subject<number | null>()
  $draggedEnd = new Subject<number | null>()
  $hasStartedBeingDragged = new Subject<StartInfo | null>()
  $onEnter = new Subject<number | null>()
  $onNewComp = new Subject<NewComp>()
  $normalOpacity = new Subject<boolean>()
  $dragOver = new Subject<DragOver>()

  constructor() {
    this.$hasStartedBeingDragged.subscribe(d => d ? this.compDraggedOver = d.compId : '')
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
      let temp = this.createElement()
      let before = Math.abs(rectChoosen.top - cursorY) > Math.abs(rectChoosen.bottom - cursorY)

      if(this.isFocuseChanged(choosenElement, before)){
        this.deleteTmpElement(compartiment)
        
        if (before) {
          compartiment.insertBefore(temp, choosenElement)
        } else {
          choosenElement.parentNode?.insertBefore(temp, choosenElement.nextSibling)
        }
        this.tempElement = new TempElement(choosenElement, before)
      }

    }


  }

  private isFocuseChanged(choosenElement: HTMLElement, before: boolean): boolean{
    if(!this.tempElement) return true
    if(this.tempElement?.element != choosenElement || ((this.tempElement.before && before) || (!this.tempElement.before && !before) )){
      return true
    }
    return false
  }

  private createElement(): HTMLElement {
    let newTemp = document.createElement("div")
    newTemp.style.width = "100%";
    newTemp.style.height = "125px";
    newTemp.style.backgroundColor = "blue";
    newTemp.classList.add("temp-item")
    newTemp.setAttribute("id", "temp")

    return newTemp
  }

  private isBettween(x: number, top: number, bottom: number): boolean {
    if (x <= bottom && x >= top) return true
    return false
  }

  private getTempElement(compartiment: HTMLElement) {
    let childElementArray = Array.from(compartiment.childNodes)

    let tempElement: HTMLElement | null = null
    for (let i = 0; i < childElementArray.length; i++) {
      let element = childElementArray[i]
      if (element instanceof HTMLElement) {
        if (element.getAttribute("temp")) {
          tempElement = element
          break;
        }
      }
    }

    return tempElement
  }

  private deleteTmpElement(compartiment: HTMLElement){
    let el = this.getTempElement(compartiment)
    if(el) el.remove()
  }

}
