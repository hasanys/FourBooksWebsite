<?php
header("Content-Type:application/json");
header("Content-Type: text/html;charset=UTF-8");
header("Access-Control-Allow-Origin: *");
require "data.php";

if(!empty($_GET['book']))
{
	$name=$_GET['book'];
	if (empty($_GET['id']))
		$id = 3;
	else
		$id=$_GET['id'];
	if ($id == -1) {
		$data = get_desc($name);
		echo json_encode($data);
	}
	else {
		if (strpos( $name, 'kafi' ) !== false) {
			$data = get_content("al-kafi", $id);
			echo json_encode($data);
			//response(200,"Product Found",$data);		
		}	
	}
}
else
{
	response(400,"Invalid Request",NULL);
}

?>