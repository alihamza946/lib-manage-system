import React, { useEffect, useState } from "react";

function Dashboard() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Get user role from localStorage
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, []);

  return (
    <div className="dashboard">
      <h1>Welcome to your Dashboard</h1>

      {role === "admin" && (
        <div>
          <h2>Admin Dashboard</h2>
          <p>Manage users, authors, and books here.</p>
          {/* Admin-specific content */}
        </div>
      )}

      {role === "author" && (
        <div>
          <h2>Author Dashboard</h2>
          <p>Manage your books, see statistics, etc.</p>
          {/* Author-specific content */}
        </div>
      )}

      {role === "user" && (
        <div>
          <h2>User Dashboard</h2>
          <p>View your books, manage your profile, etc.</p>
          {/* User-specific content */}
        </div>
      )}

      {!role && (
        <div>
          <h2>Please log in to access the dashboard</h2>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
