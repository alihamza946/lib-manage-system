import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DownloadedBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('/api/v1/users/me/downloaded')
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching downloaded books:', error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Downloaded Books</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        {books.length === 0 ? (
          <p className="text-gray-500">No downloaded books.</p>
        ) : (
          <div className="space-y-4">
            {books.map(book => (
              <div key={book.id} className="flex justify-between items-center border-b py-2">
                <div className="flex flex-col">
                  <span className="font-semibold">{book.title}</span>
                  <span className="text-gray-500">{book.author}</span>
                </div>
                <a
                  href={`/downloads/${book.id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Open
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DownloadedBooks;
