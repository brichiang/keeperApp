<?php
header("Access-Control-Allow-Origin: *");
//var_dump($_POST);
//exit;

try {
  $conn = new PDO("mysql:host=otwsl2e23jrxcqvx.cbetxkdyhwsb.us-east-1.rds.amazonaws.com;dbname=gyouhxotplngs2a6", "pjopd6mry7afcabz", "jmmt6v7o313z2clh");
} catch (PDOException $e) {
  echo "Error".$e->getMessage();
}

$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];


//$query = "INSERT INTO receipts (picture, title, location, price, date, return_date) VALUES ('https://www.imgworlds.com/wp-content/uploads/2015/12/18-CONTACTUS-HEADER.jpg', 'Game', 'EBGames', '50', 'Dec 13', 'Dec 31')";

$query = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$password')";

//$query = "INSERT INTO receipts (picture, title, location, price, date, return_date) VALUES ('".$_POST["picture"]."', '".$_POST["title"]."', '".$_POST["location"]."', '".$_POST["price"]."', '".$_POST["date"]."', '".$_POST["return_date"]."')";
//
//echo "$query";

$result = $conn->query($query);
if($result){
  $id = $conn->lastInsertId();
  echo json_encode(array(
    "status"=>true,
    "id"=>$id
  ));
} else {
  echo json_encode(false);
}

//CREATE TABLE receipts (
//    receipt_id INT NOT NULL AUTO_INCREMENT, 
//    picture LONGTEXT,
//    title VARCHAR(255),
//    location VARCHAR(255),
//    price DOUBLE(7,2),
//    user_id INT, 
//    date VARCHAR(10),
//    return_date VARCHAR(10),
//    PRIMARY KEY(receipt_id)
//    );
?>