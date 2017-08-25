<?php 

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: X-Requested-With');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
require "data.php";

$formData = json_decode(file_get_contents('php://input'));

$array = array(
    "name" => $_POST['name'],
    "email" => $_POST['email'],
    "rating" => $_POST['rating'],
    "message" => $_POST['message']
);

$result = array();
if (is_null($array["name"]) || is_null($array["email"])){
    $result["status"] = "error";
    $result["message"] = "Input parameter error...";
}
else {

$run = send_store_email("al-kafi", $array);

if ($run === "SUCCESS")
    $result["status"] = $run;
else {
    $result["status"] = "error";
    $result["message"] = $run;
}
}
echo json_encode($result);

/*






*/
?>