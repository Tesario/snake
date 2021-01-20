class Apple{
    constructor(apple_color, ax, ay){
        this.apple_color = apple_color;
        this.ax = ax;
        this.ay = ay;
    }
    check_apple(){
        if(snake.px == this.ax && snake.py == this.ay){
            // Change Score
            gameManager.change_score(gameManager.score++);
            // + 1 Part Of Snake
            snake.snakeExtension();
            // Generate Apple(s)
            this.generate_apple();
        }
    }
    generate_apple(){
        this.ax = Math.floor(Math.random()*(canvas.width/tile_size)) *tile_size;
        this.ay = Math.floor(Math.random()*(canvas.height/tile_size)) *tile_size;
        this.apple_color = Apple.generate_apple_color();
        // Check If Apple Spawn On Snake Body
        snake.checkAppleOnSnake();
    }
    static generate_apple_color(){ 
        return apple_colors[Math.floor(Math.random()*apple_colors.length)];
    }
}
