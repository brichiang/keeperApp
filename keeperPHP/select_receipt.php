<?php
header("Access-Control-Allow-Origin: *");
try {
  $conn = new PDO("mysql:host=otwsl2e23jrxcqvx.cbetxkdyhwsb.us-east-1.rds.amazonaws.com;dbname=gyouhxotplngs2a6", "pjopd6mry7afcabz", "jmmt6v7o313z2clh");
} catch (PDOException $e) {
  echo "Error".$e->getMessage();
}

$receipt_id = $_POST['receipt_id'];
$user_id = $_POST['user_id'];
//$budget = $_POST['budget'];
//$currency = $_POST['currency']

$query = "SELECT price FROM receipts WHERE receipt_id='$receipt_id' AND user_id='$user_id'";
//$query = "SELECT * FROM users WHERE id=postedid";

$result = $conn->query($query);
if($result){
  $users = $result->fetchAll();
  if(!empty($users)){
    echo json_encode(array(
      "status"=>true,
      "id"=>$users[0]["user_id"]
    ));
  } else {
    echo json_encode(false);
  }
} else {
  echo json_encode(false);
}

?>