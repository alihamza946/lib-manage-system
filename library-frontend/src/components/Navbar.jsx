// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Library Management</Link>
        <div>
          <Link to="/login" className="mr-4 hover:underline">Login</Link>
          <Link to="/signup" className="hover:underline">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
