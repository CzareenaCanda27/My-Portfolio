import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../assets/layout.css';
import { isAuthenticated, clearJWT } from '../lib/auth-helper';
import { signout } from '../lib/api-auth';

export default function Layout() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(() => isAuthenticated());
  const [cyberpunkMode, setCyberpunkMode] = useState(false);

  useEffect(() => {
    const syncAuth = () => setAuth(isAuthenticated());
    window.addEventListener('auth-changed', syncAuth);
    return () => window.removeEventListener('auth-changed', syncAuth);
  }, []);

  const toggleTheme = () => {
    setCyberpunkMode(!cyberpunkMode);
  };

  const handleSignout = () => {
    signout().finally(() => {
      clearJWT(() => {
        navigate('/');
      });
    });
  };

  return (
    <div className="layout-root" data-theme={cyberpunkMode ? 'cyberpunk' : 'classic'}>
      <header className="layout-header">
        <div className="header-top" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
          <img src={logo} alt="Logo" className="layout-logo" />
          <h1 className="layout-title" style={{ margin: 0 }}>MY PORTFOLIO</h1>

          <button
            onClick={toggleTheme}
            style={{
              marginLeft: '20px',
              padding: '12px 24px',
              fontSize: '1.2rem',
              fontFamily: 'Impact, sans-serif',
              cursor: 'pointer',
              backgroundColor: cyberpunkMode ? '#39FF14' : '#ff007f',
              color: cyberpunkMode ? '#000' : '#fff',
              border: '3px solid #00E5FF',
              boxShadow: cyberpunkMode ? '0px 0px 15px #39FF14' : '5px 5px 0px #000',
              transition: 'all 0.2s ease'
            }}
          >
            {cyberpunkMode ? '⚡ CLASSIC MODE' : '🔮 TRI-NEON MODE'}
          </button>
        </div>

        <nav className="layout-nav">
          <Link to="/" className="nav-link">HOME</Link>
          <Link to="/about" className="nav-link">ABOUT</Link>
          <Link to="/education" className="nav-link">EDUCATION</Link>
          <Link to="/project" className="nav-link">PROJECT</Link>
          <Link to="/contact" className="nav-link">CONTACT</Link>
          <Link to="/services" className="nav-link">SERVICES</Link>

          {!auth ? (
            <>
              <Link to="/signin" className="nav-link">SIGN IN</Link>
              <Link to="/signup" className="nav-link">SIGN UP</Link>
            </>
          ) : (
            <>
              <span className="nav-link" style={{ color: '#00E5FF', fontWeight: 'bold' }}>
                USER: {auth.user.name.toUpperCase()} ({auth.user.role.toUpperCase()})
              </span>
              <button
                onClick={handleSignout}
                className="nav-link"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: 'inherit'
                }}
              >
                SIGN OUT
              </button>
            </>
          )}
        </nav>
      </header>

      <main className="layout-content">
        <Outlet />
      </main>
    </div>
  );
}
