<?php
$dsn = 'mysql:dbname=loduwa;host=localhost;port=8080';
$user = 'root';
$password = '';

$dbh = new PDO($dsn, $user, $password);
$count = $dbh->exec("set names utf8");

$json = file_get_contents('php://input');
$data = json_decode($json);
print_r($data);

$query = "SELECT * from magnet WHERE id=" . $data->id;
$sth = $dbh->prepare($query);
$sth->execute();
$result = $sth->fetchAll(PDO::FETCH_ASSOC);
print_r($result);
if ($result) {
  $sth = $dbh->prepare('UPDATE magnet 
  SET text = ?, x = ?, y = ?, width = ?, height = ?, zIndex = ?  
  WHERE id = ?');
  $arr = array($data->text, $data->x, $data->y, $data->width, $data->height, $data->zIndex, $data->id);
  print_r($arr);
  $sth->execute($arr);
  print_r('amogus');
}
