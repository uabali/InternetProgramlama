// Kitap Yönetimi JavaScript

let books = JSON.parse(localStorage.getItem('books')) || [];
let editingBookId = null;
let deletingBookId = null;

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', function() {
    displayBooks();
    
    // Form submit
    document.getElementById('bookForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveBook();
    });
    
    // İptal butonu
    document.getElementById('cancelBtn').addEventListener('click', function() {
        resetForm();
    });
});

// Kitapları listele
function displayBooks() {
    const tbody = document.getElementById('bookTableBody');
    const emptyState = document.getElementById('emptyState');
    const table = document.getElementById('bookTable');
    
    if (books.length === 0) {
        table.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    table.style.display = 'table';
    emptyState.style.display = 'none';
    
    tbody.innerHTML = '';
    
    books.forEach(book => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${escapeHtml(book.title)}</strong></td>
            <td>${escapeHtml(book.author)}</td>
            <td>${escapeHtml(book.isbn)}</td>
            <td>${escapeHtml(book.publisher || '-')}</td>
            <td>${book.year || '-'}</td>
            <td>${book.category ? `<span class="badge badge-success">${escapeHtml(book.category)}</span>` : '-'}</td>
            <td class="actions">
                <button class="btn btn-warning btn-sm" onclick="editBook('${book.id}')">
                    ✏️ Düzenle
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteBook('${book.id}')">
                    🗑️ Sil
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Kitap kaydet (Ekle veya Güncelle)
function saveBook() {
    const title = document.getElementById('bookTitle').value.trim();
    const author = document.getElementById('bookAuthor').value.trim();
    const isbn = document.getElementById('bookIsbn').value.trim();
    const publisher = document.getElementById('bookPublisher').value.trim();
    const year = document.getElementById('bookYear').value;
    const pages = document.getElementById('bookPages').value;
    const category = document.getElementById('bookCategory').value;
    const description = document.getElementById('bookDescription').value.trim();
    
    if (!title || !author || !isbn) {
        showAlert('Lütfen zorunlu alanları doldurun!', 'danger');
        return;
    }
    
    if (editingBookId) {
        // Güncelleme
        const bookIndex = books.findIndex(b => b.id === editingBookId);
        if (bookIndex !== -1) {
            books[bookIndex] = {
                ...books[bookIndex],
                title,
                author,
                isbn,
                publisher,
                year: year ? parseInt(year) : null,
                pages: pages ? parseInt(pages) : null,
                category,
                description,
                updatedAt: new Date().toISOString()
            };
            showAlert('Kitap başarıyla güncellendi!', 'success');
        }
    } else {
        // Yeni ekleme
        const newBook = {
            id: generateId(),
            title,
            author,
            isbn,
            publisher,
            year: year ? parseInt(year) : null,
            pages: pages ? parseInt(pages) : null,
            category,
            description,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        books.push(newBook);
        showAlert('Kitap başarıyla eklendi!', 'success');
    }
    
    localStorage.setItem('books', JSON.stringify(books));
    displayBooks();
    resetForm();
}

// Kitap düzenle
function editBook(id) {
    const book = books.find(b => b.id === id);
    if (!book) return;
    
    editingBookId = id;
    
    document.getElementById('bookId').value = book.id;
    document.getElementById('bookTitle').value = book.title;
    document.getElementById('bookAuthor').value = book.author;
    document.getElementById('bookIsbn').value = book.isbn;
    document.getElementById('bookPublisher').value = book.publisher || '';
    document.getElementById('bookYear').value = book.year || '';
    document.getElementById('bookPages').value = book.pages || '';
    document.getElementById('bookCategory').value = book.category || '';
    document.getElementById('bookDescription').value = book.description || '';
    
    document.getElementById('formTitle').textContent = '✏️ Kitap Düzenle';
    document.getElementById('submitBtn').textContent = '✓ Güncelle';
    document.getElementById('cancelBtn').style.display = 'inline-block';
    
    // Formu görünür yap
    document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth' });
}

// Kitap sil
function deleteBook(id) {
    const book = books.find(b => b.id === id);
    if (!book) return;
    
    deletingBookId = id;
    document.getElementById('deleteBookName').textContent = book.title;
    document.getElementById('deleteModal').classList.add('active');
}

// Silme onayı
function confirmDelete() {
    if (!deletingBookId) return;
    
    books = books.filter(b => b.id !== deletingBookId);
    localStorage.setItem('books', JSON.stringify(books));
    
    showAlert('Kitap başarıyla silindi!', 'success');
    displayBooks();
    closeDeleteModal();
}

// Modal kapat
function closeDeleteModal() {
    document.getElementById('deleteModal').classList.remove('active');
    deletingBookId = null;
}

// Formu sıfırla
function resetForm() {
    document.getElementById('bookForm').reset();
    document.getElementById('bookId').value = '';
    editingBookId = null;
    
    document.getElementById('formTitle').textContent = '📖 Yeni Kitap Ekle';
    document.getElementById('submitBtn').textContent = '✓ Kaydet';
    document.getElementById('cancelBtn').style.display = 'none';
}

// Uyarı göster
function showAlert(message, type) {
    const alertBox = document.getElementById('alertBox');
    alertBox.textContent = message;
    alertBox.className = `alert alert-${type} show`;
    
    setTimeout(() => {
        alertBox.classList.remove('show');
    }, 3000);
}

// HTML escape
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ID oluştur
function generateId() {
    return 'book_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

