// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function HomePage() {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Library Management System</h1>
          <p className="text-lg mb-4">Manage your books, users, and more with ease.</p>
          <div>
            <Link
              to="/login"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-4 hover:bg-blue-600"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
