<?php
header("Content-Type:application/json");
header("Content-Type: text/html;charset=UTF-8");
header("Access-Control-Allow-Origin: *");
require "data.php";

if(!empty($_GET['book']))
{
	$book=$_GET['book'];
	if (!empty($_GET['hadith'])) {
		$hadith=$_GET['hadith'];
		$data = get_hadith_by_number($book, $hadith);
		echo json_encode($data);
	}
	else {
		$content_id = $_GET['content_id'];
		$chapter = $_GET['chapter'];
		$number = $_GET['number']; //Check empty?

		$data = get_hadith_by_content($book, $content_id, $chapter, $number);
		echo json_encode($data);		
	}
}
else
{
	response(400,"Invalid Request",NULL);
}

?>