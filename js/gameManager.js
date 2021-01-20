class GameManager{
    constructor(snakeAlive, score, time){
        this.snakeAlive = snakeAlive;
        this.score = score;
        this.time = time;

        this.timeInterval;
    }
    stopGame(){
        this.snakeAlive = false;
    }
    showDeath(){
        $('.score').text("You failed! Score: "+ this.score);
        $('.score').append("<p>Submit your score or press ENTER to play again!</p>");
        // Show Button Again
        $('.btnAgain').toggleClass('show');
        // Show/Hide AddToStats Table And Edit Score Input
        this.addToStatsTable(this.score, this.time);
        // Stop Timer
        this.stopTime();
    }
    resetGame(){
        // Hide Button Again
        $('.btnAgain').toggleClass('show');
        // Game Loop Restart
        gameManager.snakeAlive = true;
        // Change Score
        this.change_score(this.score = 0);
        // Reset Snake Positions, Size And Velocity
        snake.reset_snake();
        // Reset Snake Image
        this.changeImage('snake.png');
        // Show/Hide AddToStats Table And Edit Score Input
        this.addToStatsTable(0);
    }
    addToStatsTable(score, time){
        $('.addToStats').toggleClass('show');
        $('.addToStats #score').val(score);
        $('.addToStats #time').val(time);
    }
    changeImage(src){
        $('.info img').attr('src', "img/"+src)
    }
    change_score(){
        $('.score').text("Score: "+ this.score);
    }   
    change_time(){
        $('.time').text("Time: "+ this.convert_time(this.time));
    }
    convert_time(time){
        let min = ("0"+(Math.floor(time / 60))).slice(-2);
        let sec = ("0"+(time % 60)).slice(-2);
        return min +":"+sec;
    }
    startTime(){
        this.timeInterval = setInterval(() => {
            this.time++;
            this.change_time();
        }, 1000);
    }
    stopTime(){
        clearInterval(this.timeInterval);
    }
}