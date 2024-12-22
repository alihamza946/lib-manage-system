import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import ManageUsers from './pages/admin/manageusers';
import ManageAuthors from './pages/admin/manageauthors';
import ManageBooks from './pages/admin/managebooks';
import UserProfile from './pages/users/userprofile';
import AddToReadLater from './pages/users/addtoreadlater';
import DownloadedBooks from './pages/users/downloadbooks';
import Books from './pages/author/books';
import AuthorProfile from './pages/author/authorprofile';



function App() {
  

  return (
    <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
       {/* Auth Routes */}
       <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Author Routes */}
          <Route path="/author/authorprofile" element={<AuthorProfile />} />
          <Route path="/author/books" element={<Books />} />
          
          {/* Admin Routes */}
          <Route path="/admin/manageusers" element={<ManageUsers />} />
          <Route path="/admin/manageauthors" element={<ManageAuthors />} />
          <Route path="/admin/managebooks" element={<ManageBooks />} />
          
          {/* User Routes */}
          <Route path="/users/userprofile" element={<UserProfile />} />
          <Route path="/users/addtoreadlater" element={<AddToReadLater />} />
          <Route path="/users/downloadedbooks" element={<DownloadedBooks />} />
    </Routes>
  </Router>
  );
}

export default App;
