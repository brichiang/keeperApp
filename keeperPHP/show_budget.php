<?php
header("Access-Control-Allow-Origin: *");      
try {
  $conn = new PDO("mysql:host=otwsl2e23jrxcqvx.cbetxkdyhwsb.us-east-1.rds.amazonaws.com;dbname=gyouhxotplngs2a6", "pjopd6mry7afcabz", "jmmt6v7o313z2clh");
} catch (PDOException $e) {
  echo "Error".$e->getMessage();
}
  
//$query = "SELECT * FROM receipts";

$id = $_POST['user_id'];
$query = "SELECT budget, currency FROM budget WHERE user_id = $id";

$result = $conn->query($query);
if($result){
  $users = $result->fetchAll();
  echo json_encode($users);
} else {
  echo json_encode(false);
}

?>