<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="shortcut icon" href="../img/snake.png" type="image/x-icon">
    <title>ScoreBoard</title>
</head>
<body>
    <section id="scoreBoard" class="container">
        <?php
            include('snakeHeader.php');
        ?>
        <div class="img-box winning_cup">
            <img src="../img/winning_cup.png" alt="winning cup">
        </div>
        <?php
            include('showStatsTable.php');
            function convert_time($time){
                $min = sprintf('%02d',floor($time/60));
                $sec = sprintf('%02d', ($time%60));
                return $min .":".$sec;
            }
        ?>
    </section>
</body>
</html>