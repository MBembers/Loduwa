<?php
$dsn = 'mysql:dbname=loduwa;host=localhost;port=8080';
$user = 'root';
$password = '';

$dbh = new PDO($dsn, $user, $password);
$count = $dbh->exec("set names utf8");

$json = file_get_contents('php://input');
$data = json_decode($json);

$query = "SELECT * from magnet WHERE id='" . $data->id . "'";
$sth = $dbh->prepare($query);
$sth->execute();
$result = $sth->fetchAll(PDO::FETCH_ASSOC);
if (!$result) {
  $query = "INSERT INTO magnet (x, y, width, height, zIndex, text, fridge_name) VALUES (" . $data->x . ", " . $data->y . ", " . $data->width . ", " . $data->height . ", " . $data->zIndex . ", '" . $data->text . "', '" . $data->fridgeName . "')";
  $sth = $dbh->prepare($query);
  $sth->execute();
  $query = "SELECT * FROM magnet ORDER BY id DESC LIMIT 1";
  $sth = $dbh->prepare($query);
  $sth->execute();
  $result = $sth->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($result);
}
