// src/components/UserList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UpdateUser from './UpdateUser.jsx';
import AddUser from './Adduser.jsx';
import './UserList.css';



const UserList = () => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Cek apakah token tersedia di localStorage
                const token = localStorage.getItem('token');

                // Jika token tidak tersedia, redirect ke halaman login
                if (!token) {
                    navigate('/login');
                    return;
                }

                // Jika token tersedia, lakukan fetch data
                const response = await axios.get('https://localhost:44324/api/UserAPI', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);

                // Jika terdapat error, bisa dilakukan penanganan sesuai kebutuhan
            }
        };

        fetchUsers();
    }, [navigate, showUpdateForm]);

    const handleUpdate = (userId) => {
        // Navigasi ke halaman update dengan menyertakan ID pengguna
        navigate(`/update-user/${userId}`);
    };

    const handleDelete = async (userId) => {
        try {
            // Cek apakah token tersedia di localStorage
            const token = localStorage.getItem('token');

            // Jika token tidak tersedia, redirect ke halaman login
            if (!token) {
                navigate('/login');
                return;
            }

            // Jika token tersedia, lakukan penghapusan user
            await axios.delete(`https://localhost:44324/api/UserAPI/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Setelah penghapusan berhasil, refresh data user
            alert(`User with ID ${userId} has been deleted`);
            window.location.reload();

        } catch (error) {
            console.error('Error deleting user:', error);
            // Handle error jika diperlukan
        }
    };

    const handleLogout = () => {
        // Hapus token dari localStorage dan kembali ke halaman login
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="user-list-container">
            <h2>User List</h2>
            <div className="user-list-header">
                <button className="btn-add" onClick={() => navigate('/add-user')}>Add New User</button>
                <button className="btn-logout" onClick={handleLogout}>Logout</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                            <td>
                                <button className="btn-update" onClick={() => handleUpdate(user.id)}>Update</button>
                                <button className="btn-delete" onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showUpdateForm && <UpdateUser userId={selectedUserId} setShowUpdateForm={setShowUpdateForm} />}
        </div>
    );
};

export default UserList;
