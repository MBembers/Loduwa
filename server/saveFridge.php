<?php
$dsn = 'mysql:dbname=loduwa;host=localhost;port=8080';
$user = 'root';
$password = '';

$dbh = new PDO($dsn, $user, $password);
$count = $dbh->exec("set names utf8");

$json = file_get_contents('php://input');
$data = json_decode($json);
print_r($data);

$query = "SELECT * from fridges WHERE name='" . $data->name . "'";
$sth = $dbh->prepare($query);
$sth->execute();
$result = $sth->fetchAll(PDO::FETCH_ASSOC);
if ($result) {
  $query = "UPDATE fridges SET count=" . $data->count . ", current=" . $data->current . " WHERE name='" . $data->name . "'";
  $sth = $dbh->prepare($query);
  $sth->execute();
} else {
  if ($data->name) {
    $query = "INSERT INTO fridges (name, count, current) VALUES ('" . $data->name . "', 0, 0)";
    $sth = $dbh->prepare($query);
    $sth->execute();
  }
}
