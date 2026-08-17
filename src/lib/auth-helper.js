const notifyAuthChanged = () => {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('auth-changed'));
    }
};

export const authenticate = (jwt, cb) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(jwt));
        notifyAuthChanged();
    }
    cb();
};

export const isAuthenticated = () => {
    if (typeof window === 'undefined') return false;
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    }
    return false;
};

export const clearJWT = (cb) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
        notifyAuthChanged();
    }
    cb();
};
