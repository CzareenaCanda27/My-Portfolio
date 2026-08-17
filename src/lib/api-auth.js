import API_URL from './api-config';

export const signin = async (user) => {
    try {
        let response = await fetch(`${API_URL}/auth/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        return await response.json();
    } catch (err) {
        console.error('Sign-in error:', err);
    }
};

export const signout = async () => {
    try {
        let response = await fetch(`${API_URL}/auth/signout`, { method: 'GET' });
        return await response.json();
    } catch (err) {
        console.error('Sign-out error:', err);
    }
};
