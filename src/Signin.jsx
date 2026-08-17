import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signin } from './lib/api-auth';
import { authenticate } from './lib/auth-helper';

export default function Signin() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: ''
    });

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const user = {
            email: (formData.get('email') || values.email || '').toString().trim() || undefined,
            password: (formData.get('password') || values.password || '').toString() || undefined
        };

        signin(user).then((data) => {
            if (!data) {
                setValues({ ...values, error: 'Could not reach the authentication server.' });
                return;
            }
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                authenticate(data, () => {
                    setValues({ ...values, error: '' });
                    navigate('/');
                });
            }
        });
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '2px solid #000', background: '#fff', boxShadow: '4px 4px 0 #000' }}>
            <h2 style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '1px' }}>Sign In</h2>
            {values.error && <p style={{ color: 'red' }}>{values.error}</p>}
            <form onSubmit={handleSubmit}>
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
                    Sign In
                </button>
            </form>
        </div>
    );
}
