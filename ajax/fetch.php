<?php
require_once '../config/database.php';
require_once '../classes/book.php';

header('Content-Type: application/json');

$db = new Database();
$pdo = $db->getConnection();
$book = new Book($pdo);

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);
    $data = $book->getById($id);
    echo json_encode($data ?: []);
} else {
    $data = $book->getAll();
    echo json_encode($data);
}
