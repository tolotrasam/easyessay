<html>
<head>

	<title>Tolotra | Welcome to EasyEssay!</title>
</head>
<body>

<?php
/**
 * Created by PhpStorm.
 * User: Tolotra Samuel
 * Date: 11/04/2017
 * Time: 20:56
 */
require 'config.php';

$sql = "SELECT essay_id, essay_title FROM essay";

$result = $conn->query( $sql );
echo '<ul>';
echo '<li><a href = "essay.php">New Essay</a></li>';
echo'<br>';
while ( $row = mysqli_fetch_array( $result ) ) {

	$id    = $row['essay_id'];
	$title = $row['essay_title'];
	echo '<li><a href = "essay.php?essay_id=' . $id . '">' . $title . '</a></li>';

}

echo '</ul>';

?>
</body>

</html>