import React from 'react';

export default function Project() {
  // Data structure to hold your projects
  const projects = [
    {
      title: "LOCATION ARRIVAL ALARM",
      role: "Lead Mobile Architect",
      desc: "Developed a detailed Software Requirements Specification for a location-aware mobile application.",
      tech: "React Native | Firebase",
      emoji: "🚨",
      bg: "#eecbff"
    },
    {
      title: "DAVE'S HOT CHICKEN SITE",
      role: "Frontend Web Developer",
      desc: "Implemented a stylized, web-based digital menu system using custom HTML, CSS, and JS.",
      tech: "HTML | CSS | JavaScript",
      emoji: "🍗",
      bg: "#ffff00"
    },
    {
      title: "AUTO BACKUP ENGINE",
      role: "Systems Administrator",
      desc: "Built an automated Oracle relational database backup and logging script on a Linux server.",
      tech: "Linux Shell | Crontab | Oracle SQL",
      emoji: "💾",
      bg: "#bae1ff"
    }
  ];

  return (
    <div className="projects-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <div className="retro-window projects-window" style={{ maxWidth: '850px', width: '100%' }}>
        <div className="window-header">
          <h2 className="name-title">MY_PROJECTS.EXE</h2>
        </div>
        
        <div className="window-body">
          <p className="description" style={{ marginBottom: '30px', textAlign: 'center', fontWeight: 'bold' }}>
            A SHOWCASE OF RECENT SOFTWARE ENGINEERING AND WEB DEVELOPMENT PROJECTS.
          </p>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
            gap: '20px',
            width: '100%' 
          }}>
            {projects.map((proj, index) => (
              <div className="project-card" key={index} style={{ 
                border: '2px solid #000', 
                padding: '15px', 
                backgroundColor: '#fff', 
                boxShadow: '4px 4px 0px #000',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative', // Necessary for the absolute tech-stack reveal
                overflow: 'hidden'
              }}>
                <div style={{ width: '100%', height: '140px', backgroundColor: proj.bg, border: '2px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', marginBottom: '12px', boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.2)' }}>
                  {proj.emoji}
                </div>
                <h3 style={{ margin: '0 0 10px 0', fontFamily: 'Impact, sans-serif', letterSpacing: '1px', fontSize: '1.25rem' }}>
                  {proj.title}
                </h3>
                <p style={{ margin: '0 0 8px 0', fontSize: '0.85rem', fontWeight: 'bold' }}>
                  <span style={{ backgroundColor: '#ffff00', border: '1px solid #000', padding: '1px 4px' }}>ROLE:</span> {proj.role}
                </p>
                <p style={{ margin: '0 0 12px 0', fontSize: '0.85rem', lineHeight: '1.4', flexGrow: 1 }}>
                  {proj.desc}
                </p>

                {/* INTERACTIVE TECH STACK REVEAL */}
                <div className="tech-stack">
                  {proj.tech}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}