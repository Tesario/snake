class Draw{
    drawRectangle(color, x, y, width, height){
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
    }
    drawGrid(){
        for(let j = 0; j < (canvas.width / tile_size);j++){
            for(let i = 0; i < (canvas.height / tile_size); i++){
                // Grid Tile
                this.drawRectangle('#ddd', j * tile_size, i * tile_size,tile_size-1,tile_size-1) 
            }
        }
    }
    drawTail(){
        snake.snakeBody.forEach((snakePart)=>{
            draw.drawRectangle('#0c1', snakePart.x, snakePart.y,tile_size,tile_size) 
        });
    }
}