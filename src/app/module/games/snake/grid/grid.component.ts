import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'snake-grid',
  standalone: true,
  imports: [],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class SnakeGridComponent {
  @ViewChild('container') grid!: ElementRef
  @Input() render!: Subject<boolean>
  snake!: Snake
  gridNb: number = 30

  constructor(){

  }
  
  ngAfterViewInit(){
    this.generateGrid(this.gridNb)
    if (this.render) {
      if(this.snake == null || this.snake == undefined) this.snake = new Snake(this.gridNb)
      this.render.subscribe(()=>{
        this.update()
        this.draw()
      })
    }
  }

  private generateGrid(nb: number){
    let grid = this.grid.nativeElement as HTMLElement
    for(let i = 0; i < nb*nb; i ++){
      grid.appendChild(this.generateSquare(i))
    }
    let gridStyle = grid.style
    gridStyle.display = 'grid'
    gridStyle.gridTemplateColumns = `repeat(${nb}, 1fr)`
    gridStyle.gridTemplateRows = `repeat(${nb}, 1fr)`
  }

  private generateSquare(i: number): HTMLElement{
    let newDiv = window.document.createElement("div")
    newDiv.style.border = 'solid 1px black'
    newDiv.style.width = '20px'
    newDiv.style.height = '20px'
    newDiv.setAttribute("id", (i + 1).toString())
    return newDiv
  }

  private updateSquare(x:number, y:number){
    let grid = this.grid.nativeElement
    let square = grid.children[this.getElementNumber(x,y) - 1]
    square.style.backgroundColor = 'red'
  }

  private getElementNumber(x:number, y:number): number{
    return (y-1)*this.gridNb + x
  }

  private update(){
    let d = this.snake.direction
    console.log(this.snake.snake)
    let head = this.snake.snake[this.snake.snake.length - 1]
    
    let newx = head.x;
    let newy = head.y;
    switch(d){
      case Direction.DOWN: newy = head.y + 1; break;
      case Direction.UP: newy = head.y - 1; break;
      case Direction.LEFT: newx = head.x - 1; break;
      case Direction.RIGHT: newx = head.x + 1; break;
    }
    let newPart = new SnakePart(newx,newy)
    this.snake.snake.shift()
    this.snake.snake.push(newPart)
  }

  private resetGrid(){
    let grid = this.grid.nativeElement
    let array = grid.children as HTMLElement[]
    for(let i = 0; i < array.length; i++){
      grid.children[i].style.backgroundColor = 'blue'
    }
  }

  private draw(){
    this.resetGrid();
    this.snake.snake.forEach(part => {
      this.updateSquare(part.x,part.y)
    })
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if(this.snake){
      switch(event.key){
        case "ArrowUp": this.snake.direction = Direction.UP; break;
        case "ArrowDown": this.snake.direction = Direction.DOWN; break;
        case "ArrowLeft": this.snake.direction = Direction.LEFT; break;
        case "ArrowRight": this.snake.direction = Direction.RIGHT; break;
      }
    }
  }

  
}

class Snake{
  constructor(size: number){
    let unit = Math.floor(size/2);
    this.snake.push(new SnakePart(unit, unit - 1))
    this.snake.push(new SnakePart(unit, unit ))
    this.snake.push(new SnakePart(unit, unit + 1))
    this.snake.push(new SnakePart(unit, unit + 2))
    this.snake.push(new SnakePart(unit, unit + 3))
  }
  snake: SnakePart[] = []
  direction: Direction = Direction.DOWN
}

class SnakePart{
  constructor(x:number, y:number){
    this.x=x
    this.y=y
  }
  x!: number
  y!: number
}

enum Direction {
  DOWN, UP, LEFT, RIGHT
}
