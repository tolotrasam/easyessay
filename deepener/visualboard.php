<?php

//how to fetch data from database2
//creating table and column var
$table = "visualboard";
$usernametbl = "username";
$posttbl = "post";
$datetbl = "date";
$filetype = "filetype";
$filename = "filename";
$filepath = "filepath";
//special selection
$now = date("Y-m-d H:i:s",time());
// $lastid = 5;
require 'connect.php';

  // $sql="SELECT * FROM $table where $datetbl < $now ORDER BY $datetbl DESC limit 30";
  $sql="SELECT * FROM $table  order by date desc";
   // where id = (SELECT max(id) FROM $table)

  $result = $conn->query($sql);
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
		//this is the development of  $result = $conn->query($sql); 
		//mysqli_connect($servername, $username, $password, $database)->query("SELECT * FROM chatbox ORDER BY id DESC")->fetch_assoc()["username"]
        $username = $row[$username_tbl];
		$post = $row[$posttbl];
		$date = $row [$datetbl];
		$id = $row [id];
		$imagename = $row[$filename];
		$imagepath = $row[$filepath];
	
		// 
        echo '<h2 class="author">'.$username.' posted:</h2><h3>'.$post.'</h3><img class = "visual-picture" src="'.$imagepath.' " alt="'.$imagename.' 
		" style="width:100%;" onerror="this.style.display=\'none\'">></img><h4 class="date"> at '.$date.'</h4>';
	
}} else {
    echo "0 visualboard recorded";
}
?>

