<?php
header("Access-Control-Allow-Origin: *");
//var_dump($_POST);
//exit;

try {
  $conn = new PDO("mysql:host=otwsl2e23jrxcqvx.cbetxkdyhwsb.us-east-1.rds.amazonaws.com;dbname=gyouhxotplngs2a6", "pjopd6mry7afcabz", "jmmt6v7o313z2clh");
} catch (PDOException $e) {
  echo "Error".$e->getMessage();
}

$picture = $_POST['picture'];
$title = $_POST['title'];
$location = $_POST['location'];
$price = $_POST['price'];
$date = $_POST['date'];
$return_date = $_POST['return_date'];
$user_id = $_POST['user_id'];

//$query = "INSERT INTO receipts (picture, title, location, price, date, return_date) VALUES ('https://www.imgworlds.com/wp-content/uploads/2015/12/18-CONTACTUS-HEADER.jpg', 'Game', 'EBGames', '50', 'Dec 13', 'Dec 31')";

$query = "INSERT INTO receipts (picture, title, location, price, date, return_date, user_id) VALUES ('$picture', '$title', '$location', '$price', '$date', '$return_date','$user_id')";

//$query = "INSERT INTO receipts (picture, title, location, price, date, return_date) VALUES ('".$_POST["picture"]."', '".$_POST["title"]."', '".$_POST["location"]."', '".$_POST["price"]."', '".$_POST["date"]."', '".$_POST["return_date"]."')";
//

$result = $conn->query($query);
if($result){
  echo json_encode(true);
} else {
  echo json_encode(false);
}

//CREATE TABLE receipts (
//    receipt_id INT NOT NULL AUTO_INCREMENT, 
//    picture LONGTEXT NOT NULL,
//    title VARCHAR(255) NOT NULL,
//    location VARCHAR(255) NOT NULL,
//    price DECIMAL(7,2) NOT NULL,
//    user_id INT NOT NULL, 
//    date VARCHAR(10) NOT NULL,
//    return_date VARCHAR(10),
//    PRIMARY KEY(receipt_id)
//    );
?>