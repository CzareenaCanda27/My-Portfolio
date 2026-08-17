import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URL from './lib/api-config';

export default function Signup() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: ''
    });

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const user = {
            name: (formData.get('name') || values.name || '').toString().trim(),
            email: (formData.get('email') || values.email || '').toString().trim(),
            password: (formData.get('password') || values.password || '').toString()
        };

        try {
            let response = await fetch(`${API_URL}/api/users`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            let data = await response.json();
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                alert('Account created successfully! Please sign in.');
                navigate('/signin');
            }
        } catch (err) {
            console.error(err);
            setValues({ ...values, error: 'Could not reach the signup server.' });
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '2px solid #000', background: '#fff', boxShadow: '4px 4px 0 #000' }}>
            <h2 style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '1px' }}>Sign Up</h2>
            {values.error && <p style={{ color: 'red' }}>{values.error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name: </label>
                    <input
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange('name')}
                        required
                        style={{ width: '100%', marginBottom: '10px', padding: '8px', border: '2px solid #000' }}
                    />
                </div>
                <div>
                    <label>Email: </label>
                    <input
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange('email')}
                        required
                        style={{ width: '100%', marginBottom: '10px', padding: '8px', border: '2px solid #000' }}
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange('password')}
                        required
                        style={{ width: '100%', marginBottom: '10px', padding: '8px', border: '2px solid #000' }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        padding: '10px 16px',
                        border: '2px solid #000',
                        background: '#00E5FF',
                        fontFamily: 'Impact, sans-serif',
                        cursor: 'pointer'
                    }}
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
}
