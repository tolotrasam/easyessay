<?php

require 'config.php';

function pr( $arr ) {
	echo '<pre>';
	print_r( $arr );
	echo '</pre>';
};


$postdata = file_get_contents( "php://input" );
$request  = json_decode( $postdata );
if ( isset ( $request->action ) ) {
	$action = $request->action;
}
if ( ! isset( $action ) ) {
	$action = $_POST['action'];
//echo 'action is: '.$action.'<br>';
}

if ( $action == 'save-essay' || $action=='register-new-essay' ) {
	$essay_content = $request->essay_content;
	$essay_title   = $request->essay_title;

	require 'config.php';
	$essay_content = json_encode( $essay_content );
	$essay_content = mysqli_real_escape_string( $conn, $essay_content );
	$essay_title   = mysqli_real_escape_string( $conn, $essay_title );
	$newRandomId = rand(1,999999);

	if(empty($essay_title)){
		$essay_title = 'Untitled essay - '.$newRandomId;
	}
	if(empty($essay_content) || !isset($essay_content) || is_null($essay_content)){
		$essay_content = '';
	}
	//inserting data
	$sql = "INSERT INTO essay (essay_id, essay_title, essay_content) VALUES ('$newRandomId','$essay_title','$essay_content')";

	if ( mysqli_query( $conn, $sql ) ) {
		echo 1;
//		return $newRandomId;
	} else {
		echo "Error: " . $sql . "<br>" . mysqli_error( $conn );
	}
};

if ( $action == 'update-essay' ) {
	$essay_content = $request->essay_content;
	$essay_title   = $request->essay_title;
	$essay_id      = $request->essay_id;

	require 'config.php';

	$essay_content = json_encode( $essay_content );
	$essay_content = mysqli_real_escape_string( $conn, $essay_content );
	$essay_title   = mysqli_real_escape_string( $conn, $essay_title );

	mysqli_query( $conn, "UPDATE  essay SET essay_content = '$essay_content', essay_title='$essay_title' WHERE essay_id='$essay_id'" );

	echo mysqli_affected_rows( $conn );
};

if ( $action == 'fetch-essay' ) {
	$essay_id = $request->essay_id;
	$sql      = "SELECT essay_content FROM essay WHERE essay_id='$essay_id' Limit 1";

	$result = $conn->query( $sql );
	$data   = array();
	$rows   = '';
	while ( $row = mysqli_fetch_array( $result ) ) {

		$data[] = $row;
		$rows   = $row;
	}

	print ( $rows[0] );
}
?>