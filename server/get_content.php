<?php
header("Content-Type:application/json");
header("Content-Type: text/html;charset=UTF-8");
header("Access-Control-Allow-Origin: *");
require "data.php";

if(!empty($_GET['book']))
{
	$name=$_GET['book'];

		$id=$_GET['id'];
	if ($id == -1) {
		$data = get_desc($name);
		echo json_encode($data);
	}
	else {
			$data = get_content($name, $id);
			echo json_encode($data);
	}
}
else
{
	response(400,"Invalid Request",NULL);
}

?>