<?php
header("Content-Type:application/json");
header("Content-Type: text/html;charset=UTF-8");
header("Access-Control-Allow-Origin: *");
require "data.php";

if(!empty($_GET['book']))
{
	$name=$_GET['book'];
	if (empty($_GET['part']))
		$part = 1;
	else
		$part=$_GET['part'];
	if ($part == -1) {
		$data = get_desc($name);
		echo json_encode($data);
	}
	else {
	
			$data = get_titles($name, $part);
			echo json_encode($data);
			//response(200,"Product Found",$data);			
	}
}
else
{
	response(400,"Invalid Request",NULL);
}

function response($status,$status_message,$data)
{
	header("HTTP/1.1 ".$status_message);
	
	$response['status']=$status;
	$response['status_message']=$status_message;
	$response['data']=$data;
	
	$json_response = json_encode($response);
	echo $json_response;
}
?>