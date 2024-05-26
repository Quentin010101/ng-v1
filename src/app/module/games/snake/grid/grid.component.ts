import { Component, ElementRef, EventEmitter, HostListener, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
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
  @Input() reset!: Subject<boolean>
  @Input() size!: number
  @Output() onEnd = new EventEmitter<boolean>()
  @Output() onSpeed = new EventEmitter<boolean>()


  snake: Snake | null= null
  
  isDirty: boolean = false
  food: Food | null = null

  constructor(){

  }

  ngOnChanges(c:SimpleChanges){
    if(c['size'] && !c['size'].firstChange ){
      this.generateGrid(c['size'].currentValue)
    }
  }

  ngOnInit(){
    if(this.reset){
      this.reset.subscribe(()=> this.onReset())
    }
  }
  
  ngAfterViewInit(){
    
    if (this.render) {
      this.render.subscribe(()=>{
        if(this.snake == null || this.snake == undefined) this.snake = new Snake(this.size)
        if(!this.food && this.snake) this.generateFood()
        this.isDirty = false
        this.update()
        this.draw()
      })
    }
    this.generateGrid(this.size)

  }

  private generateGrid(nb: number){
    let grid = this.grid.nativeElement as HTMLElement
    grid.innerHTML = '';
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
    newDiv.classList.add("snakeSquare")
    newDiv.setAttribute("id", (i + 1).toString())
    return newDiv
  }

  private updateSquare(x:number, y:number){
    let grid = this.grid.nativeElement
    let square = grid.children[this.getElementNumber(x,y) - 1]
    square.classList.add("snakePiece")
  }

  private updateFood(){
    let f = this.food
    if(f){
      let grid = this.grid.nativeElement
      let food = grid.children[this.getElementNumber(f.x,f.y) - 1]
      food.classList.add("food")
    }
  }

  private getElementNumber(x:number, y:number): number{
    return (y-1)*this.size + x
  }

  private update(){
    if(this.snake == null) return
    let d = this.snake.direction
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
    if(this.checkUpdateValid(newPart)){
      let eat = false
      if(!this.isEating(newPart)){
        this.snake.snake.shift()
      }else{
        eat = true
      }
      this.snake.snake.push(newPart)
      if(eat) this.generateFood()
    }
  }

  private isEating(part: SnakePart):boolean{
    if(this.food && part.x == this.food.x && part.y == this.food.y){
      this.onSpeed.emit(true)
      return true
    }
    return false
  }

  private checkUpdateValid(part:SnakePart): boolean{
    let result = this.snake?.snake.find((sPart)=>{
      return (sPart.x == part.x && sPart.y == part.y)
    })
    if(part.x > 0 && part.y > 0 && part.x <= this.size && part.y <= this.size && result === undefined){
      return true
    }
    this.onEnd.emit(true)
    return false
  }

  private resetGrid(){
    let grid = this.grid.nativeElement
    let array = grid.children as HTMLElement[]
    for(let i = 0; i < array.length; i++){
      grid.children[i].classList.remove('food')
      grid.children[i].classList.remove('snakePiece')
    }
  }

  private draw(){
    if(this.snake == null) return
    this.resetGrid();
    this.snake.snake.forEach(part => {
      this.updateSquare(part.x,part.y)
    })
    this.updateFood()
  }

  private onReset(){
    this.snake = null
    this.resetGrid();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if(this.snake && !this.isDirty){
      if(!this.isForbidenDirection(event.key)){
        switch(event.key){
          case "ArrowUp": this.snake.direction = Direction.UP; break;
          case "ArrowDown": this.snake.direction = Direction.DOWN; break;
          case "ArrowLeft": this.snake.direction = Direction.LEFT; break;
          case "ArrowRight": this.snake.direction = Direction.RIGHT; break;
        }
        this.isDirty = true
      }
    }
  }

  private isForbidenDirection(directionAsked: string): boolean{
    if(this.snake != null){
      let d = this.snake.direction
      if(directionAsked == "ArrowUp" && (d == Direction.DOWN || d == Direction.UP)) return true
      if(directionAsked == "ArrowDown" && (d == Direction.DOWN || d == Direction.UP)) return true
      if(directionAsked == "ArrowLeft" && (d == Direction.LEFT || d == Direction.RIGHT)) return true
      if(directionAsked == "ArrowRight" && (d == Direction.LEFT || d == Direction.RIGHT)) return true
    }
    return false
  }

  private generateFood(){
    let itemValid:boolean = false
    let x: number = -1
    let y: number = -1
    while(!itemValid){
      x = Math.floor(Math.random()*this.size) + 1
      y = Math.floor(Math.random()*this.size) + 1
      let result = this.snake?.snake.find((sPart)=>{
        return (sPart.x == x && sPart.y == y)
      })
      if(result === undefined){
        itemValid = true
      }

    }
    this.food = new Food(x,y)
  }
}

class Snake{
  constructor(size: number){
    let unit = Math.floor(size/2);
    this.snake.push(new SnakePart(unit, unit - 1))
    this.snake.push(new SnakePart(unit, unit ))
    this.snake.push(new SnakePart(unit, unit + 1))
    // this.snake.push(new SnakePart(unit, unit + 2))
    // this.snake.push(new SnakePart(unit, unit + 3))
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
class Food{
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
