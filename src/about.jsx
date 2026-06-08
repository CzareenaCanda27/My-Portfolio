import React from 'react';
// Correct relative path to assets folder from src root
import './assets/about.css'; 
import myResumePdf from './assets/resume.pdf';
// Correct relative paths to your image assets
import cameraFrame from './assets/photo-framed.png'; 

export default function About() {
  return (
    <div className="about-container">
      
      {/* LEFT COLUMN: CAM DISPLAY FRAME */}
      <div className="photo-wrapper">
        <img 
          src={cameraFrame} 
          className="photo-framed" 
          alt="Digicam Profile View" 
        />
      </div>

      {/* RIGHT COLUMN: RETRO COMPUTER OS WINDOW */}
      <div className="retro-window">
        <div className="window-header">
          <h2 className="name-title">Czareena Canda</h2>
        </div>
        
        <div className="window-body">
          <p className="description">
            I'M A SOFTWARE ENGINEERING TECHNICIAN STUDENT AT CENTENNIAL COLLEGE 
            WITH A PASSION FOR BUILDING EXPRESSIVE, VISUALLY BOLD DIGITAL EXPERIENCES. 
            I LOVE BLENDING TECHNOLOGY WITH CREATIVITY, TURNING IDEAS INTO 
            INTERACTIVE DESIGNS. MY WORK REFLECTS MY PERSONALITY — MAXIMALIST, 
            COLORFUL, AND UNAPOLOGETICALLY UNIQUE.
          </p>
          
          <div className="resume-row">
            <span className="pixel-folder-icon">📁</span>
            {/* Safe relative path targeting your public folder asset or assets directory */}
            <a href={myResumePdf} target="_blank" rel="noopener noreferrer">
  <button className="resume-btn">VIEW MY RESUME</button>
</a>
          </div>
        </div>
      </div>

    </div>
  );
}