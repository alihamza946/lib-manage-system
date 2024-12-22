import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddToReadLater = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('/api/v1/users/me/readlater')
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching read later books:', error));
  }, []);

  const handleRemoveFromReadLater = (id) => {
    axios.delete(`/api/v1/users/me/readlater/${id}`)
      .then(() => {
        setBooks(books.filter(book => book.id !== id));
      })
      .catch(error => console.error('Error removing book from read later:', error));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Books in Read Later</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        {books.length === 0 ? (
          <p className="text-gray-500">No books in your read later list.</p>
        ) : (
          <div className="space-y-4">
            {books.map(book => (
              <div key={book.id} className="flex justify-between items-center border-b py-2">
                <div className="flex flex-col">
                  <span className="font-semibold">{book.title}</span>
                  <span className="text-gray-500">{book.author}</span>
                </div>
                <button
                  onClick={() => handleRemoveFromReadLater(book.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddToReadLater;
