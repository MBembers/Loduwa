<?php
$dsn = 'mysql:dbname=loduwa;host=localhost;port=8080';
$user = 'root';
$password = '';

$dbh = new PDO($dsn, $user, $password);
$count = $dbh->exec("set names utf8");

if (isset($_GET['name'])) {
  $fridge_name = $_GET['name'];
  $query = 'SELECT * from fridges WHERE name = ?';
  $sth = $dbh->prepare($query);
  $sth->execute(array($fridge_name));
  $result = $sth->fetch(PDO::FETCH_ASSOC);
  if ($result) {
    $fridge_data = $result;
    // echo json_encode($result);
    $query = 'SELECT * from magnet WHERE fridge_name = ?';
    $sth = $dbh->prepare($query);
    $sth->execute(array($fridge_name));
    $result = $sth->fetchAll(PDO::FETCH_ASSOC);
    // $fridge_data->magnets = $result;
    echo json_encode(array($fridge_data, $result));
  } else {
    echo '"podejrzus"';
  }
}
