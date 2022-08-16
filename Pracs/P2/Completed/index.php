<!DOCTYPE html>
<html>
    <head>
        <title>IMY 220 - Prac 2</title>
        <meta charset="utf-8" />
        <!-- NAME AND SURNAME IS HERE -->
        <meta name="author" content="Tayla Orsmond"/>
    </head>
    <body>
        
        <form action="index.php" method="GET">
            <label for="nRows">Number of rows: </label>
            <input type="number" id="nRows" name="numRows" />
            <input type="submit" name="" value="Change"/>
        </form>

        <?php
            //Part 1
            echo "</br>";
            $file = file_get_contents("names.txt");
            $arr = explode("\n", $file);
            $rows = -1;
            if(isset($_GET["numRows"])){$rows = $_GET["numRows"];}
            if($rows <= 0 || !isset($rows)){$rows = 1;}
            $cols = count($arr) / $rows;
            $index = 0;
            echo "<table border='1'>";
                for($i = 0; $i < $rows; $i++){
                    echo "<tr>";
                        for($j = 0; $j < $cols; $j++){
                            echo "<td>";
                                if($index < count($arr)){echo $arr[$index];}
                            echo "</td>";
                            $index++;
                        } 
                    echo "</tr>";
                }
            echo "</table>";

            //Part 2
            echo '<form action="index.php" method="GET">
                    <input type="hidden" name="numRows" value="'.$rows.'"/>
                    <input type="hidden" name="split" value=""/>
                    <input type="submit" name="" value="Split and create groups"/>
                </form>';
            if(isset($_GET["split"])){
                $index = 0;
                $firstHalf = array_slice($arr, 0, ceil(count($arr)/2));
                $secondHalf = array_slice($arr, ceil(count($arr)/2));
                $secondHalf = array_reverse($secondHalf);
                $newArr = [];
                for($i = 0; $i < count($secondHalf); $i++){
                    array_push($newArr, ($firstHalf[$i] . ' and ' . $secondHalf[$i]));
                }
                if(count($firstHalf) > count($secondHalf)){array_push($newArr, end($firstHalf));}
                $c = count($newArr) / $rows;
                echo "<br><table border='1'>";
                    for($i = 0; $i < $rows; $i++){
                        echo "<tr>";
                            for($j = 0; $j < $c; $j++){
                                echo "<td>";
                                    if($index < count($newArr)){echo $newArr[$index];}
                                echo "</td>";
                                $index++;
                            } 
                        echo "</tr>";
                    }
                echo "</table>";
            }
        ?>
    </body>
</html>