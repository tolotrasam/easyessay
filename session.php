<?php
if ( ! isset( $_SESSION['hasSession'] ) || ! $_SESSION['hasSession'] ) {
	session_start();
	$_SESSION['hasSession'] = true;
	echo 'hasSTARTED SESSION';
}
?>