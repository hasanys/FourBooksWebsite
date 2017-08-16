<?php

function get_titles($name, $part)
{
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = $name;
	$part_name = $part;
	
	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	$conn->set_charset("utf8");
	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	} 
	
	$sql = "SELECT * FROM contents WHERE part=$part_name";
	//$result = $conn->query($sql);
	$result = mysqli_query($conn, $sql);

	$data = array();
	if ($result->num_rows > 0) {
    // output data of each row
		while($row = $result->fetch_assoc()) {
			$data[] = array( 'id' => $row["id"], 'english' => $row["name_english"], 'arabic' => $row["name_arabic"], 'pages' => $row["pages"], 'volume' => $row["volume"]);
		}
	} 
	
	$conn->close();
	return $data;
}

function get_desc($name)
{
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = $name;
	
	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);

	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	} 
	
	$sql = "SELECT * FROM description";
	//$result = $conn->query($sql);
	$result = mysqli_query($conn, $sql);

	$data = array();
	if ($result->num_rows > 0) {
    // output data of each row
		while($row = $result->fetch_assoc()) {
			$arr = array( 'text' => $row["description"]);
			$conn->close();
			return $arr;
		}
	} 
	
	$conn->close();
	return $data;
}
?>