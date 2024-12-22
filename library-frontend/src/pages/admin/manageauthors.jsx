import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageAuthors = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    axios.get('/api/v1/authors')
      .then(response => setAuthors(response.data))
      .catch(error => console.error('Error fetching authors:', error));
  }, []);

  const handleDeleteAuthor = (id) => {
    axios.delete(`/api/v1/authors/${id}`)
      .then(() => {
        setAuthors(authors.filter(author => author.id !== id));
      })
      .catch(error => console.error('Error deleting author:', error));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Manage Authors</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {authors.map(author => (
              <tr key={author.id} className="border-b">
                <td className="px-4 py-2">{author.name}</td>
                <td className="px-4 py-2">{author.email}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handleDeleteAuthor(author.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
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

export default ManageAuthors;
