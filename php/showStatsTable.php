<?php
    @$db = new mysqli ('localhost', 'root', '', 'snake');
    if(mysqli_connect_errno()){
        echo '<h2>Failed to connect database, contact developer</h2>';
    }
    else{
        $query = "SELECT nickname, score, time
        FROM `stats` 
        ORDER BY score DESC, time ASC
        LIMIT 10";

        $stmt = $db->prepare($query);
        $stmt->execute();
        $stmt->store_result();
        $stmt -> bind_result($nickname, $score, $time);
        echo "<div>";
        echo "<h1>Global ScoreBoard</h1>";
        echo "<table class='stats-table'>";
        echo "<tr>
                 <th>Position</th>
                 <th>Nickname</th>
                 <th>Score</th>
                 <th>Time</th>
              </tr>";
        for($i = 1; $stmt->fetch(); $i++){
            echo "<tr>
                    <td>".$i.".</td>
                    <td>".$nickname."</td>
                    <td>".$score."</td>
                    <td>".convert_time($time)."</td>
                  </tr>";
        }
        echo "</table>";
        echo "</div>";
    }

?>