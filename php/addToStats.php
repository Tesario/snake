<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="shortcut icon" href="../img/snake.png" type="image/x-icon">
    <title>Snake | Score</title>
</head>
<body>
<section id="scoreBoard" class="container">
    <?php
    include('snakeHeader.php');
    echo "<div>";
    if(empty($_POST['nickname'])|| empty($_POST['password'])|| empty($_POST['score']|| empty($_POST['time']))){
        echo "<h2>Please fill all textboxes</h2>";
        TryLoginAgain($_POST['score'], $_POST['time']);
    }
    else{
        $nickname = $_POST['nickname'];
        $password = md5($_POST['password']);
        $score = $_POST['score'];
        $time = $_POST['time'];

        @$db = new mysqli ('localhost', 'root', '', 'snake');
        if(mysqli_connect_errno()){
            echo '<h2>Failed to connect database, contact developer</h2>';
        }
        else{
            $query = "SELECT id, nickname, password, score, time
                    FROM `stats` 
                    WHERE `nickname` LIKE ?";
            $stmt = $db->prepare($query);
            $stmt -> bind_param('s', $nickname);
            $stmt->execute();
            $stmt->store_result();
            $stmt -> bind_result($id_db, $nickname_db, $password_db, $score_db, $time_db);

            $stmt->fetch();

            if($stmt -> num_rows() > 0 && $password != $password_db){
                echo "<h2>This nickname already exists or wrong password!</h2>";
                echo "<h2>You can try it again:</h2>";
                TryLoginAgain($_POST['score'], $_POST['time']);
            }
            else if($score_db < $score || $nickname_db == "" || $score_db == $score && $time_db > $time){
                $stmt -> free_result();
                if($nickname_db==""){
                    echo "<h2>Your stats was created</h2>";
                    $query = "INSERT INTO stats(nickname, password, score, time) 
                            VALUES (?, ?, ?,?)";
                    $stmt = $db -> prepare($query);
                    $stmt -> bind_param("ssdd", $nickname, $password, $score, $time);
                }
                else{
                    echo "<h2>Your stats was updated</  h2>";
                    $query = "UPDATE stats SET score = $score, time = $time
                            WHERE id = $id_db";     
                    $stmt = $db -> prepare($query);
                }
                $stmt -> execute();
                echo "<h2>Your score was succesfully added</h2>";
            }
            else {
                echo "<h2>It's not you personal record!</h2>";
                echo '<h2>Your best score: '.$score_db.'</h2>';
                echo '<h2>Your best time: '.convert_time($time_db).'</h2>';
            }
            $db -> close();
        }
    }
        echo "<h2>Actual score: ".$_POST['score']."</h2>";
        echo "<h2>Actual time: ".convert_time($_POST['time'])."</h2>";
    echo "</div>";
    include('showStatsTable.php');
    function TryLoginAgain($score, $time){
        echo '<form class="addToStats" action="addToStats.php" method="POST">';
            echo '<input name="nickname" type="text" placeholder="Nickname">';
            echo '<input name="password" type="password" placeholder="Password">';
            echo '<input name="score" type="hidden" value="'.$score.'">';
            echo '<input name="time" type="hidden" value="'.$time.'">';
            echo '<input type="submit" value="Submit">';
        echo '</form>';
    }
    function convert_time($time){
        $min = sprintf('%02d',floor($time/60));
        $sec = sprintf('%02d', ($time%60));
        return $min .":".$sec;
    }
    ?>   
</section>
</body>
</html>