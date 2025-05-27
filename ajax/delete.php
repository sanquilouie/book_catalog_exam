<?php
require_once '../config/database.php';
require_once '../classes/book.php';

header('Content-Type: application/json');

$db = new Database();
$pdo = $db->getConnection();
$book = new Book($pdo);

$id = intval($_POST['id'] ?? 0);

if (!$id) {
    echo json_encode(['success' => false, 'message' => 'Invalid book ID']);
    exit;
}

$success = $book->delete($id);

echo json_encode(['success' => $success]);
