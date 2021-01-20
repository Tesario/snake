class Snake {
  constructor(
    snakeSpeed,
    snake_length,
    snakeBody,
    px,
    py,
    move_x,
    move_y,
    chg_x,
    chg_y
  ) {
    this.snakeSpeed = snakeSpeed;
    this.snake_length = snake_length;
    this.px = px;
    this.py = py;
    this.snakeBody = snakeBody;
    this.move_x = move_x;
    this.move_y = move_y;
    this.chg_x = chg_x;
    this.chg_y = chg_y;
  }

  check_direction() {
    if (this.px >= canvas.width) this.px = 0;
    if (this.px < 0) this.px = canvas.width;
    if (this.py >= canvas.height) this.py = 0;
    if (this.py < 0) this.py = canvas.height;

    if (this.px % tile_size == 0 && this.chg_x == 0) {
      this.move_y = this.chg_y;
      this.move_x = 0;
    } else if (this.py % tile_size == 0 && this.chg_y == 0) {
      this.move_x = this.chg_x;
      this.move_y = 0;
    }
  }
  increase_direction() {
    this.px += this.move_x * this.snakeSpeed;
    this.py += this.move_y * this.snakeSpeed;
  }
  snake_direction(ev) {
    // Nemohu použít this - odkazuje se na event
    var key = ev.keyCode;
    switch (key) {
      case 38: // UP
      case 87:
        if (snake.move_y <= 0) {
          snake.chg_y = -1;
          snake.chg_x = 0;
        }
        break;
      case 40: // DOWN
      case 83:
        if (snake.move_y >= 0) {
          snake.chg_y = 1;
          snake.chg_x = 0;
        }
        break;
      case 37: // RIGHT
      case 65:
        if (snake.move_x <= 0) {
          snake.chg_x = -1;
          snake.chg_y = 0;
        }
        break;
      case 39: //LEFT
      case 68:
        if (snake.move_x >= 0) {
          snake.chg_x = 1;
          snake.chg_y = 0;
        }
        break;
      case 13:
        if (!gameManager.snakeAlive) {
          gameManager.resetGame();
        }
        break;
    }
  }
  calc_tail() {
    this.snakeBody.push({ x: this.px, y: this.py });
    this.snakeBody = this.snakeBody.slice(
      -(this.snake_length / this.snakeSpeed)
    );
  }
  check_death() {
    for (let i = 1; i < this.snakeBody.length; i++) {
      if (this.snakeBody[i].x == this.px && this.snakeBody[i].y == this.py) {
        // Reset Game
        gameManager.stopGame();
        // Show Score And Message
        gameManager.showDeath();
        // Change Image
        gameManager.changeImage("dead_snake.png");
      }
    }
  }
  reset_snake() {
    this.px = canvas.width / 2 - tile_size / 2;
    this.py = canvas.height / 2 - tile_size / 2;
    this.snakeBody = [];
    this.snake_length = default_snake_length;
    this.move_x = 0;
    this.move_y = 0;
    this.chg_x = 0;
    this.chg_y = -1;
  }

  snakeExtension() {
    this.snake_length += tile_size;
  }
  checkAppleOnSnake() {
    if (
      this.snakeBody.some(
        (snakePart) => snakePart.x == apple.ax && snakePart.y == apple.ay
      )
    )
      apple.generate_apple();
  }
}
