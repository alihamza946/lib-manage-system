import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', description: '' });
  const [editBook, setEditBook] = useState(null);

  useEffect(() => {
    axios.get('/api/v1/books')
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  const handleAddBook = () => {
    axios.post('/api/v1/books', newBook)
      .then(response => {
        setBooks([...books, response.data]);
        setNewBook({ title: '', author: '', description: '' });
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
          setEditBook(null);
        })
        .catch(error => console.error('Error editing book:', error));
    }
  };

  const handleDeleteBook = (id) => {
    axios.delete(`/api/v1/books/${id}`)
      .then(() => {
        setBooks(books.filter(book => book.id !== id));
      })
      .catch(error => console.error('Error deleting book:', error));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Manage Books</h1>

      {/* Add Book Form */}
      <div className="bg-white p-4 shadow-md rounded-lg mb-6">
        <h2 className="text-2xl font-semibold mb-4">Add New Book</h2>
        <input
          type="text"
          placeholder="Title"
          value={newBook.title}
          onChange={e => setNewBook({ ...newBook, title: e.target.value })}
          className="border p-2 w-full mb-2 rounded-md"
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={e => setNewBook({ ...newBook, author: e.target.value })}
          className="border p-2 w-full mb-2 rounded-md"
        />
        <textarea
          placeholder="Description"
          value={newBook.description}
          onChange={e => setNewBook({ ...newBook, description: e.target.value })}
          className="border p-2 w-full mb-2 rounded-md"
        />
        <button
          onClick={handleAddBook}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Book
        </button>
      </div>

      {/* Edit Book Form */}
      {editBook && (
        <div className="bg-white p-4 shadow-md rounded-lg mb-6">
          <h2 className="text-2xl font-semibold mb-4">Edit Book</h2>
          <input
            type="text"
            placeholder="Title"
            value={editBook.title}
            onChange={e => setEditBook({ ...editBook, title: e.target.value })}
            className="border p-2 w-full mb-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Author"
            value={editBook.author}
            onChange={e => setEditBook({ ...editBook, author: e.target.value })}
            className="border p-2 w-full mb-2 rounded-md"
          />
          <textarea
            placeholder="Description"
            value={editBook.description}
            onChange={e => setEditBook({ ...editBook, description: e.target.value })}
            className="border p-2 w-full mb-2 rounded-md"
          />
          <button
            onClick={handleEditBook}
            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
          >
            Update Book
          </button>
        </div>
      )}

      {/* Book List */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Author</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.id} className="border-b">
                <td className="px-4 py-2">{book.title}</td>
                <td className="px-4 py-2">{book.author}</td>
                <td className="px-4 py-2">{book.description}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => setEditBook(book)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteBook(book.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBooks;
