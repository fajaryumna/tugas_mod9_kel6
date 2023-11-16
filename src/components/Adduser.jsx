// src/components/AddUser.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddUser.css';


const AddUser = () => {
    const [newUserData, setNewUserData] = useState({
        username: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleAddUser = async () => {
        try {
            // Cek apakah token tersedia di localStorage
            const token = localStorage.getItem('token');

            // Jika token tidak tersedia, tidak melakukan penambahan
            if (!token) {
                return;
            }

            // Lakukan penambahan user dengan mengirim permintaan POST ke API
            await axios.post('https://localhost:44324/api/UserAPI', newUserData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert('User has been added');
            navigate('/user-list');

        } catch (error) {
            console.error('Error adding user:', error);
            // Handle error jika diperlukan
        }
    };

    const handleCancel = () => {
        // Batalkan penambahan dan navigasi kembali ke halaman UserList
        navigate('/user-list');
    };

    const handleInputChange = (e) => {
        // Menggunakan spread operator untuk memperbarui state newUserData
        setNewUserData({
            ...newUserData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="add-user-container">
            <h2>Add New User</h2>
            <form>
                <label>
                    Username:
                    <input type="text" name="username" value={newUserData.username} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="text" name="password" value={newUserData.password} onChange={handleInputChange} />
                </label>
                <br />
                <div className="button-container">
                    <button className="btn-add" type="button" onClick={handleAddUser}>Add</button>
                    <button className="btn-cancel" type="button" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default AddUser;
