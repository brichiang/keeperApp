<?php
header("Access-Control-Allow-Origin: *");
try {
  $conn = new PDO("mysql:host=otwsl2e23jrxcqvx.cbetxkdyhwsb.us-east-1.rds.amazonaws.com;dbname=gyouhxotplngs2a6", "pjopd6mry7afcabz", "jmmt6v7o313z2clh");
} catch (PDOException $e) {
  echo "Error".$e->getMessage();
}

$user_id = $_POST['user_id'];
$budget = $_POST['budget'];
$currency = $_POST['currency'];
//$postedbudge

$query = "UPDATE budget SET budget='$budget', currency='$currency' WHERE user_id=$user_id";

//$query = "SELECT * FROM users WHERE id=postedid";

$result = $conn->query($query);
if($result){
  //$users = $result->fetchAll();
  
  echo json_encode(array(
    "status"=>true
  ));
  
} else {
  echo json_encode(false);
}

?>