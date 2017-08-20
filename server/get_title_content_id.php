<?php
header("Content-Type:application/json");
header("Content-Type: text/html;charset=UTF-8");
header("Access-Control-Allow-Origin: *");
require "data.php";

if(!empty($_GET['id']))
{
	$id=$_GET['id'];
	
	if ($id > 0) {
		$data = get_content_title("al-kafi", $id);
		echo json_encode($data);
	}
}
else
{
	response(400,"Invalid Request",NULL);
}

?>