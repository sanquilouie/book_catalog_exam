<?php
class Book {
    private $conn;
    private $table = "book_list";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll() {
        $stmt = $this->conn->prepare("SELECT * FROM {$this->table} ORDER BY id DESC");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function add($data) {
        $sql = "INSERT INTO {$this->table} (title, isbn, author, publisher, year_published, category)
                VALUES (:title, :isbn, :author, :publisher, :year_published, :category)";
        $stmt = $this->conn->prepare($sql);
        return $stmt->execute($data);
    }

    public function delete($id) {
        $stmt = $this->conn->prepare("DELETE FROM {$this->table} WHERE id = ?");
        return $stmt->execute([$id]);
    }
}
?>
