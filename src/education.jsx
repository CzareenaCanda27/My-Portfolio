import React, { useState, useEffect } from 'react';
import { isAuthenticated } from './lib/auth-helper';
import API_URL from './lib/api-config';

export default function Education() {
  const auth = isAuthenticated();
  const [qualifications, setQualifications] = useState([]);
  const [form, setForm] = useState({
    title: '',
    firstname: '',
    lastname: '',
    email: '',
    completion: '',
    description: ''
  });

  // Default fallback list (used if MongoDB collection is empty)
  const defaultQualifications = [
    {
      title: "Diploma in Software Engineering Technician",
      firstname: "Centennial",
      lastname: "College",
      email: "candaczareena@gmail.com",
      description: "Focusing on full-stack development, object-oriented programming, and systems administration.",
      completion: "2024-01-01",
      link: "https://www.centennialcollege.ca/"
    },
    {
      title: "BS in Aeronautical Engineering",
      firstname: "Holy Angel",
      lastname: "University",
      email: "candaczareena@gmail.com",
      description: "Graduated degree program covering advanced aerodynamics, structural analysis, and engineering mathematics.",
      completion: "2023-01-01",
      link: "https://www.hau.edu.ph/"
    }
  ];

  // Fetch qualifications from MongoDB API on load
  useEffect(() => {
    fetchQualifications();
  }, []);

  const fetchQualifications = async () => {
    try {
      const res = await fetch(`${API_URL}/api/qualifications`);
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setQualifications(data);
      } else {
        setQualifications(defaultQualifications);
      }
    } catch (err) {
      console.error("Error fetching qualifications from server:", err);
      setQualifications(defaultQualifications);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/qualifications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        alert("Qualification successfully added to database!");
        setForm({ title: '', firstname: '', lastname: '', email: '', completion: '', description: '' });
        fetchQualifications();
      } else {
        alert("Failed to add qualification. Ensure you are logged in as Admin.");
      }
    } catch (err) {
      console.error("Error adding qualification:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;
    try {
      await fetch(`${API_URL}/api/qualifications/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${auth.token}` }
      });
      fetchQualifications();
    } catch (err) {
      console.error("Error deleting qualification:", err);
    }
  };

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

          {/* ⭐ ADMIN-ONLY: ADD QUALIFICATION FORM */}
          {auth && auth.user.role === 'admin' && (
            <div style={{ 
              backgroundColor: '#ffff00', 
              border: '2px solid #000', 
              padding: '15px', 
              boxShadow: '4px 4px 0px #000', 
              marginBottom: '25px',
              fontFamily: 'monospace'
            }}>
              <h3 style={{ margin: '0 0 10px 0', fontFamily: 'Impact, sans-serif', color: '#000' }}>
                ⚡ ADMIN PANEL: ADD QUALIFICATION
              </h3>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input type="text" name="title" placeholder="Qualification / Degree Title" value={form.title} onChange={handleChange} required style={{ padding: '8px', border: '2px solid #000' }} />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input type="text" name="firstname" placeholder="School / Institution Name" value={form.firstname} onChange={handleChange} required style={{ width: '50%', padding: '8px', border: '2px solid #000' }} />
                  <input type="text" name="lastname" placeholder="Department / Faculty" value={form.lastname} onChange={handleChange} required style={{ width: '50%', padding: '8px', border: '2px solid #000' }} />
                </div>
                <input type="email" name="email" placeholder="Contact Email" value={form.email} onChange={handleChange} required style={{ padding: '8px', border: '2px solid #000' }} />
                <input type="date" name="completion" value={form.completion} onChange={handleChange} required style={{ padding: '8px', border: '2px solid #000' }} />
                <textarea name="description" placeholder="Description & Program Highlights" value={form.description} onChange={handleChange} required rows="3" style={{ padding: '8px', border: '2px solid #000' }} />
                <button type="submit" style={{ backgroundColor: '#00E5FF', color: '#000', border: '2px solid #000', padding: '10px', cursor: 'pointer', fontFamily: 'Impact, sans-serif' }}>
                  SAVE QUALIFICATION TO DATABASE ➔
                </button>
              </form>
            </div>
          )}

          {/* QUALIFICATIONS LIST */}
          {qualifications.map((edu, index) => (
            <div 
              className="project-card" 
              key={edu._id || index} 
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
                  {edu.firstname} {edu.lastname}
                </h3>
                <span className="date-badge" style={{ backgroundColor: '#ffff00', border: '2px solid #000', padding: '2px 8px', fontWeight: 'bold', fontSize: '0.85rem' }}>
                  {edu.completion ? new Date(edu.completion).getFullYear() : edu.year || 'N/A'}
                </span>
              </div>
              
              <p style={{ margin: '5px 0 0 0', fontWeight: 'bold', color: '#333' }}>
                {edu.title}
              </p>
              <p style={{ margin: '5px 0 15px 0', fontSize: '0.9rem', fontStyle: 'italic' }}>
                {edu.description || edu.desc}
              </p>

              {/* ADMIN ONLY: DELETE BUTTON */}
              {auth && auth.user.role === 'admin' && edu._id && (
                <button 
                  onClick={() => handleDelete(edu._id)}
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
                  DELETE ENTRY
                </button>
              )}

              {/* Interactive Link Reveal */}
              <div className="tech-stack">
                <a 
                  href={edu.link || "https://www.centennialcollege.ca/"} 
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