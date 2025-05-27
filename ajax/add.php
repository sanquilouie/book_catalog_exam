<?php
require_once '../config/database.php';
require_once '../classes/book.php';

header('Content-Type: application/json');

$db = new Database();
$pdo = $db->getConnection();
$book = new Book($pdo);

// Post dataa
$title = $_POST['title'] ?? '';
$isbn = $_POST['isbn'] ?? '';
$author = $_POST['author'] ?? '';
$publisher = $_POST['publisher'] ?? '';
$year_published = intval($_POST['year_published'] ?? 0);
$category = $_POST['category'] ?? '';

if (!$title || !$isbn || !$author) {
    echo json_encode(['success' => false, 'message' => 'Title, ISBN and Author are required']);
    exit;
}

$data = [
    'title' => $title,
    'isbn' => $isbn,
    'author' => $author,
    'publisher' => $publisher,
    'year_published' => $year_published,
    'category' => $category
];

$success = $book->add($data);

echo json_encode(['success' => $success]);
