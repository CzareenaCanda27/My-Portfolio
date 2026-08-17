import React, { useState, useEffect } from 'react';
import { isAuthenticated } from './lib/auth-helper';
import API_URL from './lib/api-config';

export default function Project() {
  const auth = isAuthenticated();
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: '',
    firstname: '',
    lastname: '',
    email: '',
    completion: '',
    description: ''
  });

  // Default hardcoded backup items (used if MongoDB has no entries yet)
  const defaultProjects = [
    {
      title: "LOCATION ARRIVAL ALARM",
      firstname: "Czareena",
      lastname: "Canda",
      email: "candaczareena@gmail.com",
      description: "Developed a detailed Software Requirements Specification for a location-aware mobile application.",
      tech: "React Native | Firebase",
      emoji: "🚨",
      bg: "#eecbff"
    },
    {
      title: "DAVE'S HOT CHICKEN SITE",
      firstname: "Czareena",
      lastname: "Canda",
      email: "candaczareena@gmail.com",
      description: "Implemented a stylized, web-based digital menu system using custom HTML, CSS, and JS.",
      tech: "HTML | CSS | JavaScript",
      emoji: "🍗",
      bg: "#ffff00"
    },
    {
      title: "AUTO BACKUP ENGINE",
      firstname: "Czareena",
      lastname: "Canda",
      email: "candaczareena@gmail.com",
      description: "Built an automated Oracle relational database backup and logging script on a Linux server.",
      tech: "Linux Shell | Crontab | Oracle SQL",
      emoji: "💾",
      bg: "#bae1ff"
    }
  ];

  // Fetch live projects from MongoDB REST API on load
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_URL}/api/projects`);
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setProjects(data);
      } else {
        setProjects(defaultProjects);
      }
    } catch (err) {
      console.error("Error fetching projects from server:", err);
      setProjects(defaultProjects);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        },
        body: JSON.stringify(form)
      });
      
      if (res.ok) {
        alert("New project successfully created in database!");
        setForm({ title: '', firstname: '', lastname: '', email: '', completion: '', description: '' });
        fetchProjects();
      } else {
        alert("Failed to create project. Ensure you are logged in as Admin.");
      }
    } catch (err) {
      console.error("Error creating project:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;
    try {
      await fetch(`${API_URL}/api/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${auth.token}` }
      });
      fetchProjects();
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  return (
    <div className="projects-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <div className="retro-window projects-window" style={{ maxWidth: '850px', width: '100%' }}>
        <div className="window-header">
          <h2 className="name-title">MY_PROJECTS.EXE</h2>
        </div>
        
        <div className="window-body">
          <p className="description" style={{ marginBottom: '20px', textAlign: 'center', fontWeight: 'bold' }}>
            A SHOWCASE OF RECENT SOFTWARE ENGINEERING AND WEB DEVELOPMENT PROJECTS.
          </p>

          {/* ⭐ ADMIN-ONLY: ADD NEW PROJECT FORM */}
          {auth && auth.user.role === 'admin' && (
            <div style={{ 
              backgroundColor: '#ffff00', 
              border: '2px solid #000', 
              padding: '15px', 
              boxShadow: '4px 4px 0px #000', 
              marginBottom: '30px',
              fontFamily: 'monospace'
            }}>
              <h3 style={{ margin: '0 0 10px 0', fontFamily: 'Impact, sans-serif', color: '#000' }}>
                ⚡ ADMIN PANEL: CREATE NEW PROJECT
              </h3>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input type="text" name="title" placeholder="Project Title" value={form.title} onChange={handleChange} required style={{ padding: '8px', border: '2px solid #000' }} />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input type="text" name="firstname" placeholder="First Name" value={form.firstname} onChange={handleChange} required style={{ width: '50%', padding: '8px', border: '2px solid #000' }} />
                  <input type="text" name="lastname" placeholder="Last Name" value={form.lastname} onChange={handleChange} required style={{ width: '50%', padding: '8px', border: '2px solid #000' }} />
                </div>
                <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} required style={{ padding: '8px', border: '2px solid #000' }} />
                <input type="date" name="completion" value={form.completion} onChange={handleChange} required style={{ padding: '8px', border: '2px solid #000' }} />
                <textarea name="description" placeholder="Project Description" value={form.description} onChange={handleChange} required rows="3" style={{ padding: '8px', border: '2px solid #000' }} />
                <button type="submit" style={{ backgroundColor: '#00E5FF', color: '#000', border: '2px solid #000', padding: '10px', cursor: 'pointer', fontFamily: 'Impact, sans-serif' }}>
                  SAVE PROJECT TO DATABASE ➔
                </button>
              </form>
            </div>
          )}

          {/* ⭐ PROJECT CARDS GRID */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
            gap: '20px',
            width: '100%' 
          }}>
            {projects.map((proj, index) => (
              <div className="project-card" key={proj._id || index} style={{ 
                border: '2px solid #000', 
                padding: '15px', 
                backgroundColor: '#fff', 
                boxShadow: '4px 4px 0px #000',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  width: '100%', 
                  height: '140px', 
                  backgroundColor: proj.bg || '#eecbff', 
                  border: '2px solid #000', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: '3rem', 
                  marginBottom: '12px', 
                  boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.2)' 
                }}>
                  {proj.emoji || "🚀"}
                </div>

                <h3 style={{ margin: '0 0 10px 0', fontFamily: 'Impact, sans-serif', letterSpacing: '1px', fontSize: '1.25rem' }}>
                  {proj.title}
                </h3>

                <p style={{ margin: '0 0 8px 0', fontSize: '0.85rem', fontWeight: 'bold' }}>
                  <span style={{ backgroundColor: '#ffff00', border: '1px solid #000', padding: '1px 4px' }}>OWNER:</span> {proj.firstname} {proj.lastname}
                </p>

                <p style={{ margin: '0 0 12px 0', fontSize: '0.85rem', lineHeight: '1.4', flexGrow: 1 }}>
                  {proj.description || proj.desc}
                </p>

                {/* ADMIN ONLY: DELETE BUTTON */}
                {auth && auth.user.role === 'admin' && proj._id && (
                  <button 
                    onClick={() => handleDelete(proj._id)}
                    style={{
                      backgroundColor: '#ff0055',
                      color: '#fff',
                      border: '2px solid #000',
                      padding: '6px 12px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      fontFamily: 'Impact, sans-serif',
                      marginBottom: '10px'
                    }}
                  >
                    DELETE PROJECT
                  </button>
                )}

                {/* INTERACTIVE TECH STACK REVEAL */}
                <div className="tech-stack">
                  {proj.tech || `${proj.email}`}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}