import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AuthorProfile = () => {
  const [user, setUser] = useState({ name: '', email: '', bio: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch user data from backend (e.g., after login)
    axios.get('/api/v1/users/me')
      .then(response => setUser(response.data))
      .catch(error => console.error('Error fetching user profile:', error));
  }, []);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    axios.put('/api/v1/users/me', user)
      .then(response => {
        setUser(response.data);
        setIsEditing(false); // Exit edit mode
      })
      .catch(error => console.error('Error updating profile:', error));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Author Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {isEditing ? (
          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700">Name</label>
              <input
                type="text"
                value={user.name}
                onChange={e => setUser({ ...user, name: e.target.value })}
                className="border p-2 rounded-md w-full"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-gray-700">Email</label>
              <input
                type="email"
                value={user.email}
                onChange={e => setUser({ ...user, email: e.target.value })}
                className="border p-2 rounded-md w-full"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-gray-700">Bio</label>
              <textarea
                value={user.bio}
                onChange={e => setUser({ ...user, bio: e.target.value })}
                className="border p-2 rounded-md w-full h-32"
              />
            </div>

            <button
              onClick={handleSaveProfile}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        ) : (
          <div>
            <p className="text-lg mb-2"><strong>Name:</strong> {user.name}</p>
            <p className="text-lg mb-2"><strong>Email:</strong> {user.email}</p>
            <p className="text-lg mb-4"><strong>Bio:</strong> {user.bio}</p>
            <button
              onClick={handleEditProfile}
              className="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorProfile;
