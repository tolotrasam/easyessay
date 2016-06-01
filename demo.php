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

// for mysqli error, we add conn between the brackets

if (mysqli_query($conn, $sql)) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);
?>
