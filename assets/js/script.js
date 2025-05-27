document.addEventListener("DOMContentLoaded", () => {
  const bookForm = document.getElementById("bookForm");
  const bookModal = new bootstrap.Modal(document.getElementById("bookModal"));
  const bookTableBody = document.getElementById("bookTableBody");
  const bookModalLabel = document.getElementById("bookModalLabel");

  // Load all books
  function loadBooks() {
    fetch("ajax/fetch.php")
      .then((res) => res.json())
      .then((data) => {
        bookTableBody.innerHTML = "";
        data.forEach((book) => {
          bookTableBody.innerHTML += `
            <tr>
              <td>${book.title}</td>
              <td>${book.isbn}</td>
              <td>${book.author}</td>
              <td>${book.publisher}</td>
              <td>${book.year_published}</td>
              <td>${book.category}</td>
              <td>
                <button class="btn btn-sm btn-secondary edit-btn" data-id="${book.id}">EDIT</button>
                <button class="btn btn-sm btn-secondary delete-btn" data-id="${book.id}">DEL</button>
              </td>
            </tr>`;
        });
      });
  }

  loadBooks();
});
