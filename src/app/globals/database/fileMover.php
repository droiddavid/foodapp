<?php 

// header('Access-Control-Allow-Headers: Access-Control-Allow-Origin,Access-Control-Allow-Headers,Access-Control-Allow-Methods,Authorization,Content-Type');
// header('Access-Control-Allow-Origin: *');
// header('Content-Type: application/json');
// header('Access-Control-Allow-Methods: POST, OPTIONS');
// header("Access-Control-Max-Age: 86400");


header('Access-Control-Allow-Headers: Access-Control-Allow-Origin,Access-Control-Allow-Headers,Access-Control-Allow-Methods,Authorization,Content-Type');
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST, OPTIONS');


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$errors = [];

	if (isset($_FILES['files'])) {
		$extensions = ['jpg', 'jpeg', 'png', 'gif'];

		if (isset($_POST['directory'])) {
			$directory = $_POST['directory'];
		}

		$path = $_SERVER['DOCUMENT_ROOT'].'/images'; //flower_207/';

		$all_files = count($_FILES['files']['tmp_name']);

		for ($i = 0; $i < $all_files; $i++) {  

			$file_name = $_FILES['files']['name'][$i];
			$file_tmp = $_FILES['files']['tmp_name'][$i];
			$file_type = $_FILES['files']['type'][$i];
			$file_size = $_FILES['files']['size'][$i];
			
			$explode_test = explode('.', $_FILES['files']['name'][$i]);
			$file_ext = strtolower(end($explode_test));

			$file = $path .'/'. $directory . '/' . $file_name;
			if (!in_array($file_ext, $extensions)) {
				$errors[] = 'Extension not allowed: ' . $file_name . ' ' . $file_type;
			}
		}

		if ($file_size > 5242880) { //2097152 2MB
			$errors[] = 'File size exceeds limit: ' . $file_name . ' ' . $file_type;
		}

		if (!is_dir($path)) {
			mkdir($path, 0755);
		}

		$extended_path = $path .'/'. $directory;
		if (!is_dir($extended_path)) {
			mkdir($extended_path, 0755);
		}

		if (empty($errors)) {
			move_uploaded_file($file_tmp, $file);
		}
	}

	if ($errors) {
		print_r($errors);
	}
}