import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', description: '' });
  const [editBook, setEditBook] = useState(null);  // For editing existing books
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch books from the backend
    axios.get('/api/v1/books')
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  const handleAddBook = () => {
    // Send POST request to add new book
    axios.post('/api/v1/books', newBook)
      .then(response => {
        setBooks([...books, response.data]);
        setNewBook({ title: '', author: '', description: '' }); // Reset form
      })
      .catch(error => console.error('Error adding book:', error));
  };

  const handleEditBook = () => {
    if (editBook) {
      axios.put(`/api/v1/books/${editBook.id}`, editBook)
        .then(response => {
          const updatedBooks = books.map(book =>
            book.id === editBook.id ? response.data : book
          );
          setBooks(updatedBooks);
          setEditBook(null); // Reset edit form
        })
        .catch(error => console.error('Error editing book:', error));
    }
  };

  const handleDeleteBook = (id) => {
    axios.delete(`/api/v1/books/${id}`)
      .then(() => {
        setBooks(books.filter(book => book.id !== id)); // Remove deleted book from list
      })
      .catch(error => console.error('Error deleting book:', error));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Books</h1>

      {/* Add Book Form */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add New Book</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={newBook.title}
            onChange={e => setNewBook({ ...newBook, title: e.target.value })}
            className="border p-2 rounded-md w-full"
          />
          <input
            type="text"
            placeholder="Author"
            value={newBook.author}
            onChange={e => setNewBook({ ...newBook, author: e.target.value })}
            className="border p-2 rounded-md w-full"
          />
          <textarea
            placeholder="Description"
            value={newBook.description}
            onChange={e => setNewBook({ ...newBook, description: e.target.value })}
            className="border p-2 rounded-md w-full h-32"
          />
          <button
            onClick={handleAddBook}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          >
            Add Book
          </button>
        </div>
      </div>

      {/* Edit Book Form */}
      {editBook && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Edit Book</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={editBook.title}
              onChange={e => setEditBook({ ...editBook, title: e.target.value })}
              className="border p-2 rounded-md w-full"
            />
            <input
              type="text"
              placeholder="Author"
              value={editBook.author}
              onChange={e => setEditBook({ ...editBook, author: e.target.value })}
              className="border p-2 rounded-md w-full"
            />
            <textarea
              placeholder="Description"
              value={editBook.description}
              onChange={e => setEditBook({ ...editBook, description: e.target.value })}
              className="border p-2 rounded-md w-full h-32"
            />
            <button
              onClick={handleEditBook}
              className="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600"
            >
              Update Book
            </button>
          </div>
        </div>
      )}

      {/* Book List */}
      <h2 className="text-2xl font-semibold mb-4">Book List</h2>
      <ul>
        {books.map(book => (
          <li key={book.id} className="mb-4 p-4 border rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <strong className="text-xl">{book.title}</strong> by {book.author}
                <p className="text-gray-600">{book.description}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => setEditBook(book)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteBook(book.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Books;
