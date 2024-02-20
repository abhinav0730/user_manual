// UserInfo.js
import React, { useState, useEffect } from 'react';

const UserInfo = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pastSearches, setPastSearches] = useState([]);
  const [sortByName, setSortByName] = useState(false);

  useEffect(() => {
    // Fetch users from the provided API
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));

    // Load past searches from local storage
    const storedSearches = localStorage.getItem('pastSearches');
    if (storedSearches) {
      setPastSearches(JSON.parse(storedSearches));
    }
  }, []);

  useEffect(() => {
    // Save past searches to local storage
    localStorage.setItem('pastSearches', JSON.stringify(pastSearches));
  }, [pastSearches]);

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      setPastSearches(prevSearches => [...prevSearches, searchTerm]);
      setSearchTerm('');
    }
  };

  const handleSortByName = () => {
    setSortByName(!sortByName);
  };

  const clearPastSearches = () => {
    setPastSearches([]);
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (sortByName) {
      return a.name.localeCompare(b.name);
    } else {
      return 0;
    }
  });

  const filteredUsers = sortedUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>User Information</h2>

      <div>
        <label htmlFor="searchInput">Search by Name: </label>
        <input
          type="text"
          id="searchInput"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div>
        <label>Sort by Name: </label>
        <input type="checkbox" checked={sortByName} onChange={handleSortByName} />
      </div>

      <div>
        <h3>Past Searches</h3>
        <ul>
          {pastSearches.map((search, index) => (
            <li key={index}>{search}</li>
          ))}
        </ul>
        <button onClick={clearPastSearches}>Clear Past Searches</button>
      </div>

      <h3>User List</h3>
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserInfo;

