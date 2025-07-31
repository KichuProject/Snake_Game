const gameboard=document.getElementById('gameboard')
const context=gameboard.getContext('2d')
const scoretxt=document.getElementById('scoreval')
const highscoretxt=document.getElementById('hs')
let highscore=localStorage.getItem('snakehs')||0
highscoretxt.textContent=highscore
let score=0
const WIDTH=gameboard.width;
const HEIGHT=gameboard.height;
const UNIT=25
let foodx,foody
let xvel=25,yvel=0
let snake=[
    {x:UNIT*3,y:0},{x:UNIT*2,y:0},
    {x:UNIT,y:0},{x:0,y:0}
]
let active=true
let started=false
window.addEventListener('keydown',keypress)
startgame()
function startgame(){
    context.fillStyle='#212121';
    context.fillRect(0,0,WIDTH,HEIGHT)
    createfood()
    displayfood()
    drawsnake()
}
function clearboard(){
    context.fillStyle='#212121';
    context.fillRect(0,0,WIDTH,HEIGHT)
}
function createfood(){
    foodx=Math.floor(Math.random()*WIDTH/UNIT)*UNIT
    foody=Math.floor(Math.random()*HEIGHT/UNIT)*UNIT
}
function displayfood(){
    context.fillStyle='red'
    context.fillRect(foodx,foody,UNIT,UNIT)    
}
function drawsnake(){
    context.fillStyle='aqua'
    context.strokeStyle='#212121'
    snake.forEach((snakepart)=>{
        context.fillRect(snakepart.x,snakepart.y,UNIT,UNIT)
        context.strokeRect(snakepart.x,snakepart.y,UNIT,UNIT)
    })
}
function movesnake(){
    const head={x:snake[0].x+xvel,
                y:snake[0].y+yvel
    }
    snake.unshift(head)
    if(snake[0].x==foodx&& snake[0].y==foody){
        score+=1
        scoretxt.textContent=score
        if(score>highscore){
            highscore=score
            highscoretxt.textContent=highscore
            localStorage.setItem('snakehs',highscore)
        }
        createfood()
    }
    else{
        snake.pop()
    }
}
function nexttick(){
    if(active){
        setTimeout(()=>{
        clearboard()
        displayfood()
        movesnake()
        drawsnake()
        checkgameover()
        nexttick()
    },200)
    }
    else{
        clearboard()
        context.font="bold 50px cursive"
        context.fillStyle="white"
        context.textAlign="center"
        context.fillText("Game Over !",WIDTH/2,HEIGHT/2)
    }
    
}
function keypress(event){
    if(!started){
        started=true
        nexttick()
    }
    const left=37
    const up=38
    const right=39
    const down=40
    switch(true){
        case(event.keyCode==left && xvel!=UNIT):
        xvel=-UNIT
        yvel=0
        break
        case(event.keyCode==right && xvel!=-UNIT):
        xvel=UNIT
        yvel=0
        break
        case(event.keyCode==up && yvel!=UNIT):
        xvel=0
        yvel=-UNIT
        break
        case(event.keyCode==down && yvel!=-UNIT):
        xvel=0
        yvel=UNIT
        break
    }
}
function checkgameover(){
    switch(true){
        case(snake[0].x<0):
        case(snake[0].x>=WIDTH):
        case(snake[0].y<0):
        case(snake[0].y>=HEIGHT):
        active=false
        break
    }
    for(let i = 1; i < snake.length; i++){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            active = false;
        }
    }
}