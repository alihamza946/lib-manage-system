import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState({ name: '', email: '', bio: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios.get('/api/v1/users/me')
      .then(response => setUser(response.data))
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = () => {
    axios.put('/api/v1/users/me', user)
      .then(response => {
        setUser(response.data);
        setIsEditing(false);
      })
      .catch(error => console.error('Error saving changes:', error));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">User Profile</h1>

      <div className="bg-white p-6 shadow-md rounded-lg">
        <div className="mb-4">
          <label className="block font-semibold">Name</label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            disabled={!isEditing}
            className="border p-2 w-full rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            disabled={!isEditing}
            className="border p-2 w-full rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Bio</label>
          <textarea
            value={user.bio}
            onChange={(e) => setUser({ ...user, bio: e.target.value })}
            disabled={!isEditing}
            className="border p-2 w-full rounded-md"
          />
        </div>

        <div className="flex justify-end">
          {isEditing ? (
            <button
              onClick={handleSaveChanges}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={handleEditToggle}
              className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
