<?php

header('Access-Control-Allow-Headers: Access-Control-Allow-Origin,Access-Control-Allow-Headers,Access-Control-Allow-Methods,Authorization,Content-Type');
header('Access-Control-Allow-Origin: https://angdev.mypersonalkitchen.com');
header('Vary: Origin');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header("Access-Control-Max-Age: 86400");

$folderPath = "files/";
print_r("folderPath: ".$folderPath);

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
print_r("request of postdata: ".$request);

foreach ($request->fileSource as $key => $value) {
    $image_parts = explode(";base64,", $value);
    $image_type_aux = explode("image/", $image_parts[0]);
    $image_type = $image_type_aux[1];
    $image_base64 = base64_decode($image_parts[1]);
    $file = $folderPath . uniqid() . '.'.$image_type;
    file_put_contents($file, $image_base64);
}