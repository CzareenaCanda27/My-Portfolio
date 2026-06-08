import React from 'react';

export default function Education() {
  const qualifications = [
    {
      school: "CENTENNIAL COLLEGE",
      degree: "Diploma in Software Engineering Technician",
      desc: "Focusing on full-stack development, object-oriented programming, and systems administration.",
      year: "2024 – PRESENT",
      link: "https://www.centennialcollege.ca/"
    },
    {
      school: "HOLY ANGEL UNIVERSITY",
      degree: "Bachelor of Science in Aeronautical Engineering",
      desc: "Graduated degree program covering advanced aerodynamics, structural analysis, and engineering mathematics.",
      year: "2019 – 2023",
      link: "https://www.hau.edu.ph/"
    }
  ];

  return (
    <div className="education-container" style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
      
      {/* MAIN RETRO WINDOW WRAPPER */}
      <div className="retro-window education-window" style={{ maxWidth: '600px', width: '100%' }}>
        {/* Top Header Window Strip */}
        <div className="window-header">
          <h2 className="name-title">QUALIFICATIONS.EXE</h2>
        </div>
        
        {/* Main Body Info Inside Window */}
        <div className="window-body">
          <p className="description" style={{ marginBottom: '25px', textAlign: 'center', fontWeight: 'bold' }}>
            A CHRONOLOGICAL OVERVIEW OF MY ACADEMIC JOURNEY AND PROFESSIONAL QUALIFICATIONS.
          </p>

          {qualifications.map((edu, index) => (
            <div 
              className="project-card" 
              key={index} 
              style={{ 
                border: '2px solid #000', 
                padding: '20px', 
                marginBottom: '20px', 
                backgroundColor: '#fff', 
                boxShadow: '4px 4px 0px #000',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', fontFamily: 'Impact, sans-serif', letterSpacing: '1px' }}>
                  {edu.school}
                </h3>
                <span className="date-badge" style={{ backgroundColor: '#ffff00', border: '2px solid #000', padding: '2px 8px', fontWeight: 'bold', fontSize: '0.85rem' }}>
                  {edu.year}
                </span>
              </div>
              
              <p style={{ margin: '5px 0 0 0', fontWeight: 'bold', color: '#333' }}>
                {edu.degree}
              </p>
              <p style={{ margin: '5px 0 15px 0', fontSize: '0.9rem', fontStyle: 'italic' }}>
                {edu.desc}
              </p>

              {/* Interactive Link Reveal */}
              <div className="tech-stack">
                <a 
                  href={edu.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ color: '#39FF14', textDecoration: 'none', fontWeight: 'bold' }}
                >
                  VISIT SCHOOL WEBSITE 🔗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}