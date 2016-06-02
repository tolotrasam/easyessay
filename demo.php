<?php
//this is an old fashion of defining strings, dont use it anymore (mysql)

$url = parse_url(getenv("CLEARDB_DATABASE_URL"));

$server = $url["host"];
$username = $url["user"];
$password = $url["pass"];
$db = substr($url["path"], 1);

$conn = new mysqli($server, $username, $password, $db);

// Create connection we use $conn instead of $link

// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error($conn);
  }
// this vaue is a variable of the data collected in the demo-form
$value1 = $_POST['input1'];
$value2 = $_POST['input2'];

$sql = "CREATE table demo  (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
love VARCHAR(30) NOT NULL,
input1 TEXT(2000) NOT NULL,
date TIMESTAMP
)";

if ($conn->query($sql) === TRUE) {
    echo "Table newfeed created successfully";
} else {
    echo "Error creating 'demo': " . $conn->error;
}
$sql = "INSERT INTO demo (input1,love) VALUES ('$value1','$value2')";

$value3 = $_post['uploadfile'];
$target_Folder = "boardpicture/";
$file_name = $_FILES['uploadfile']['name'];
$file_type = $_FILES['uploadfile']['type'];
//inserting data
if (mysqli_query($conn, $sql)) {
	//if the picture is uploaded sucessfully,it will be moved inside the container folder
	$target_Path = $target_Folder.basename( $_FILES['uploadfile']['name'] );
$savepath = $target_Path.basename( $_FILES['uploadfile']['name'] );
        move_uploaded_file( $_FILES['uploadfile']['tmp_name'], "$target_Path" );
    //header ('location: mainvisual.html'); 
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);
?>
