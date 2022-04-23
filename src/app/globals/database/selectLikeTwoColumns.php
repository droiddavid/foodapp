<?php
	require_once 'dbHelper.php';

	$db = new dbHelper();

	$_POST = json_decode(file_get_contents('php://input'), true);

	//Declare all variables
	$table = '';
	$field1 = '';
	$value1 = '';
	$field2 = '';
	$value2 = '';


	// checking for blank values.
	if (empty($_POST['table'])) $errors['table'] = 'Table is required.';
	if (empty($_POST['field1'])) $errors['field1'] = 'Field1 is required.';
	if (empty($_POST['value1'])) $errors['value1'] = 'Value1 is required.';
	if (empty($_POST['field2'])) $errors['field2'] = 'Field2 is required.';
	if (empty($_POST['value2'])) $errors['value2'] = 'Value2 is required.';

	$table 	 	= 	$_POST['table'];
	$field1 	= 	$_POST['field1'];
	$value1 	= 	$_POST['value1'];
	$field2 	= 	$_POST['field2'];
	$value2 	= 	$_POST['value2'];

	$rows = $db->selectLikeTwoColumns($table,$field1,$value1,$field2,$value2);
	
	echo $json_response = json_encode($rows);

?>