<?php
header("Access-Control-Allow-Origin: *");
try {
  $conn = new PDO("mysql:host=otwsl2e23jrxcqvx.cbetxkdyhwsb.us-east-1.rds.amazonaws.com;dbname=gyouhxotplngs2a6", "pjopd6mry7afcabz", "jmmt6v7o313z2clh");
} catch (PDOException $e) {
  echo "Error".$e->getMessage();
}

$budget = $_POST['budget'];
$currency = $_POST['currency'];
$user_id = $_POST['user_id'];


$query = "INSERT INTO budget (budget, currency, user_id) VALUES ('$budget', '$currency', '$user_id')";

//$query = "INSERT INTO receipts (picture, title, location, price, date, return_date) VALUES ('".$_POST["picture"]."', '".$_POST["title"]."', '".$_POST["location"]."', '".$_POST["price"]."', '".$_POST["date"]."', '".$_POST["return_date"]."')";
//

$result = $conn->query($query);
if($result){
  echo json_encode(array(
    "status"=>true,
  ));
} else {
  echo json_encode(false);
}

//CREATE TABLE budget (
//    budget DECIMAL(11,2) NOT NULL,
//    currency VARCHAR(5) NOT NULL,
//    spent DECIMAL(11,2),
//    remain DECIMAL(11,2),
//    current_month VARCHAR(50),
//    year VARCHAR(50),
//    user_id INT NOT NULL 
//    );
?>