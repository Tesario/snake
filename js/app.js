//Canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
// Constants
const fps = 60;
const tile_size = 50;

// Game
let score = 0;
let time = 0;
let snakeAlive = true;

// Player
let snakeSpeed = 5;
const default_snake_length = snakeSpeed  + (tile_size * 2); //  Except Snake Head
let snake_length = default_snake_length;
let px = (canvas.width / 2) - (tile_size/2);
let py = (canvas.height / 2) - (tile_size/2);;
let snakeBody = [];
let move_x = 0;
let move_y = 0;
let chg_x = 0;
let chg_y = -1;

// Apple
const apple_colors = ['#FFA07A', '#FA8072', '#E9967A', '#F08080', '#CD5C5C', '#FF0000', '#DC143C']
let apple_color = Apple.generate_apple_color();
let ax = 0;
let ay = 0;

// Objects
const snake = new Snake(snakeSpeed, snake_length,snakeBody,px, py, move_x, move_y, chg_x, chg_y);
const apple = new Apple(apple_color, ax, ay);
const draw = new Draw();
const gameManager = new GameManager(snakeAlive, score, time);

// Document Ready
$(document).ready(()=>{
    gameLoop();  // Game Start
    apple.generate_apple();  // Generate First Apple
    gameManager.change_score(gameManager.score); // Write Start Score
    gameManager.change_time(gameManager.time); // Write Start Time
    gameManager.startTime();
    $(document).keydown(snake.snake_direction); // Keyboard Input
})


// Game Loop
function gameLoop(){
    setInterval(() => {
        if(gameManager.snakeAlive){
            moving();
            drawing();
        }
    }, 1000/fps);
}

function drawing(){
    // Draw Background
    draw.drawRectangle('white', 0,0,canvas.width, canvas.height);
    // Draw Grid
    draw.drawGrid();
    // Draw Apple
    draw.drawRectangle(apple.apple_color, apple.ax, apple.ay, tile_size, tile_size)
    // Draw Tail
    draw.drawTail();
    // Draw Head
    draw.drawRectangle('#085', snake.px, snake.py , tile_size, tile_size);
}
function moving(){
    // Check Snake Positions
    snake.check_direction();
    // Check Apple Eating
    apple.check_apple();
     // Keep Moving
    snake.increase_direction();
    // Check Death
    snake.check_death();
    // Create Tail Array
    snake.calc_tail();
}