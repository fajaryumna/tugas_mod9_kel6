// src/components/UpdateUser.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './UpdateUser.css';

const UpdateUser = () => {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
    });
    const navigate = useNavigate();
    const { userId } = useParams();

    useEffect(() => {
        const fetchUserById = async () => {
            try {
                const response = await axios.get(`https://localhost:44324/api/UserAPI/${userId}`);
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUserById();
    }, [userId]);

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return;
            }

            await axios.put(`https://localhost:44324/api/UserAPI/${userId}`, userData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            navigate('/user-list');
            alert(`User with ID ${userId} has been updated`);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleCancel = () => {
        navigate('/user-list');
    };

    const handleInputChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="update-user-container">
            <h2>Update User</h2>
            <form>
                <label>
                    Username:
                    <input type="text" name="username" value={userData.username} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="text" name="password" value={userData.password} onChange={handleInputChange} />
                </label>
                <br />
                <div className="button-container">
                    <button className="btn-update" type="button" onClick={handleUpdate}>Update</button>
                    <button className="btn-cancel" type="button" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateUser;
