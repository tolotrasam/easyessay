<?php
	if(!isset($_SESSION['hasSession'])) {
session_start();
$_SESSION['hasSession'] = true;
}
?>