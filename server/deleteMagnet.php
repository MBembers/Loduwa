<?php
$dsn = 'mysql:dbname=loduwa;host=localhost;port=8080';
$user = 'root';
$password = '';

$dbh = new PDO($dsn, $user, $password);
$count = $dbh->exec("set names utf8");

$json = file_get_contents('php://input');
$data = json_decode($json);

$query = "DELETE FROM magnet WHERE id='" . $data->id . "'";
$sth = $dbh->prepare($query);
$sth->execute();
$result = $sth->fetchAll(PDO::FETCH_ASSOC);
