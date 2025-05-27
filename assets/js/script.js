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

  //Form reset
  document.querySelector(".btn-success").addEventListener("click", () => {
    bookModalLabel.textContent = "Add Book";
    bookForm.reset();
    bookForm.id.value = ""; // Clear hidden id input
  });

  // Submit add/edit form
  bookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(bookForm);
    const id = formData.get("id");
    let url = "ajax/add.php";
    if (id) url = "ajax/edit.php"; // If id exists, it's an edit

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          bookModal.hide();
          loadBooks();
        } else {
          alert(response.message || "Error occurred");
        }
      });
  });
});
