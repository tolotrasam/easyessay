<?php
//this is an old fashion of defining strings, dont use it anymore (mysql)
define('DB_NAME', 'form1 exercice');
define('DB_USER', 'root');
define('DB_PASSWORD', '1234');
define('DB_HOST', 'localhost');
// Create connection we use $conn instead of $link
$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error($conn);
  }
// this vaue is a variable of the data collected in the demo-form
$value1 = $_POST['input1'];
$value2 = $_POST['input2'];

$sql = "INSERT INTO demo (input1,love) VALUES ('$value1','$value2')";

// for mysqli error, we add conn between the brackets

if (mysqli_query($conn, $sql)) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);
?>