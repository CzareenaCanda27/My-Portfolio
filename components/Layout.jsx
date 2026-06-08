import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
// PERFECT PATH: Goes up to client/, into src/, into assets/, and hits layout.css
import '../src/assets/layout.css'; 

export default function Layout() {
  // Theme state: false = Classic Retro Light, true = Digital Matrix Night
  const [cyberpunkMode, setCyberpunkMode] = useState(false);

  const toggleTheme = () => {
    setCyberpunkMode(!cyberpunkMode);
  };

  return (
    // This root attribute dynamically broadcasts the theme choice site-wide to layout.css
    <div className="layout-root" data-theme={cyberpunkMode ? "cyberpunk" : "classic"}>
      
      {/* GLOBAL RETRO HEADER */}
      <header className="layout-header">
        <div className="header-top" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
          
          {/* RETRO BRANDING LOGO */}
          <img 
            src="/src/assets/logo.png" 
            alt="Logo" 
            className="layout-logo" 
          />
          
          {/* Your main portfolio branding title */}
          <h1 className="layout-title" style={{ margin: 0 }}>MY PORTFOLIO</h1>

          {/* MATRIX MODE TOGGLE BUTTON */}
          <button 
  onClick={toggleTheme}
  style={{
    marginLeft: '20px',
    padding: '12px 24px',
    fontSize: '1.2rem',
    fontFamily: 'Impact, sans-serif',
    cursor: 'pointer',
    // Pink for classic, Green for Neon/Tri-Neon
    backgroundColor: cyberpunkMode ? '#39FF14' : '#ff007f',
    color: cyberpunkMode ? '#000' : '#fff',
    border: '3px solid #00E5FF', // Blue border for the button
    boxShadow: cyberpunkMode ? '0px 0px 15px #39FF14' : '5px 5px 0px #000',
    transition: 'all 0.2s ease'
  }}
>
  {cyberpunkMode ? "⚡ CLASSIC MODE" : "🔮 TRI-NEON MODE"}
</button>
        </div>
        
        {/* RETRO NAVIGATION PILLS */}
        <nav className="layout-nav">
          <Link to="/" className="nav-link">HOME</Link>
          <Link to="/about" className="nav-link">ABOUT</Link>
          <Link to="/education" className="nav-link">EDUCATION</Link>
          <Link to="/project" className="nav-link">PROJECT</Link>
          <Link to="/contact" className="nav-link">CONTACT</Link>
          <Link to="/services" className="nav-link">SERVICES</Link>
        </nav>
      </header>

      {/* THE PAGE PORTAL */}
      <main className="layout-content">
        <Outlet />
      </main>

    </div>
  );
}