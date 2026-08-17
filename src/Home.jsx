import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      
      {/* WELCOME WINDOW CONTAINER */}
      <div className="retro-window home-window" style={{ maxWidth: '600px', width: '100%' }}>
        {/* Top Header Window Striping */}
        <div className="window-header">
          <h2 className="name-title">WELCOME.EXE</h2>
        </div>
        
        {/* Main Body Info Inside Window */}
        <div className="window-body home-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
          
          {/* FIXED HEADING: Added line-height safety overrides to prevent overlapping */}
          <h1 className="welcome-heading" style={{ 
            fontSize: '2.5rem', 
            fontFamily: 'Impact, sans-serif', 
            letterSpacing: '1px',
            lineHeight: '1.2', 
            textAlign: 'center', 
            margin: '10px 0 20px 0',
            padding: '0 10px',
            color: '#000'
          }}>
            Welcome to My Portfolio
          </h1>
          
          <p className="description" style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1rem', margin: '0 0 15px 0' }}>
            HI, I'M CZAREENA! WELCOME TO MY PERSONAL DIGITAL SPACE. I'M THRILLED TO HAVE YOU HERE.
          </p>

          <hr style={{ border: 'none', borderTop: '2px solid #000', width: '100%', margin: '15px 0' }} />

          {/* MISSION STATEMENT SECTION */}
          <div className="mission-statement-box" style={{ 
            backgroundColor: '#eecbff', 
            border: '2px solid #000', 
            padding: '15px', 
            boxShadow: '4px 4px 0px #000',
            textAlign: 'center',
            width: '100%',
            boxSizing: 'border-box'
          }}>
            <h3 style={{ margin: '0 0 10px 0', fontFamily: 'Impact, sans-serif', letterSpacing: '1px' }}>✨ My Mission Statement</h3>
            <p className="mission-text" style={{ fontSize: '0.95rem', margin: 0, fontWeight: 'bold', lineHeight: '1.4' }}>
              "TO BRIDGE THE GAP BETWEEN LOGICAL ARCHITECTURE AND CREATIVE EXPRESSION. 
              AS A SOFTWARE DEVELOPER, MY GOAL IS TO BUILD MEANINGFUL, ACCESSIBLE, AND 
              VISUALLY BOLD DIGITAL EXPERIENCES THAT ENGAGE USERS AND SOLVE REAL-WORLD 
              PROBLEMS WITH UNAPOLOGETIC FLAIR."
            </p>
          </div>

          <hr style={{ border: 'none', borderTop: '2px solid #000', width: '100%', margin: '15px 0' }} />

          {/* Assignment 4 CI/CD update marker */}
          <div style={{
            width: '100%',
            border: '2px solid #000',
            backgroundColor: '#ffff00',
            boxShadow: '4px 4px 0 #000',
            padding: '12px',
            marginBottom: '10px',
            boxSizing: 'border-box'
          }}>
            <h3 style={{ margin: '0 0 8px 0', fontFamily: 'Impact, sans-serif' }}>🚀 DEPLOYMENT UPDATE</h3>
            <p style={{ margin: 0, fontWeight: 'bold', fontSize: '0.9rem' }}>
              Assignment 4 CI/CD release: this portfolio is now tested, performance-optimized,
              and deployed with continuous delivery through GitHub.
            </p>
          </div>
          
          {/* ACTION BUTTON SECTION */}
          <div className="home-actions-row" style={{ marginTop: '10px' }}>
            <Link to="/about" style={{ textDecoration: 'none' }}>
              <button className="resume-btn" style={{ 
                padding: '12px 24px', 
                fontSize: '1.1rem', 
                fontWeight: 'bold', 
                fontFamily: 'Impact, sans-serif', 
                letterSpacing: '1px',
                cursor: 'pointer' 
              }}>
                LEARN MORE ABOUT ME ➔
              </button>
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}