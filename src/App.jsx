import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import AddUser from './components/Adduser';
import LoginForm from './components/LoginForm';
import UpdateUser from './components/UpdateUser';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/user-list" element={<UserList />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/update-user/:userId" element={<UpdateUser />} />

      </Routes>
    </Router>
  );
}

export default App;
