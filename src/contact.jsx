import React, { useState, useEffect } from 'react';
import { isAuthenticated } from './lib/auth-helper';
import API_URL from './lib/api-config';

export default function Contact() {
  const auth = isAuthenticated();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    number: "",
    email: "",
    message: ""
  });

  const [contacts, setContacts] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');

  // Admin-only: Fetch all submitted messages from MongoDB
  useEffect(() => {
    if (auth && auth.user.role === 'admin') {
      fetchContacts();
    }
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/contacts`, {
        headers: { 'Authorization': `Bearer ${auth.token}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) setContacts(data);
    } catch (err) {
      console.error("Error fetching contacts:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      firstname: form.firstName,
      lastname: form.lastName,
      email: form.email,
      number: form.number,
      message: form.message
    };

    try {
      const res = await fetch(`${API_URL}/api/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (!res.ok) {
        setStatusMessage(data.error || 'Failed to submit message to server.');
        return;
      }

      console.log('Form Saved to MongoDB:', data);
      alert(`Message saved to database! Thank you, ${form.firstName}.`);
      setForm({ firstName: '', lastName: '', number: '', email: '', message: '' });
      setStatusMessage('Message submitted successfully!');

      if (auth && auth.user.role === 'admin') {
        fetchContacts();
      }
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setStatusMessage('Failed to submit message to server.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/api/contacts/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${auth.token}` }
      });
      fetchContacts();
    } catch (err) {
      console.error("Error deleting contact:", err);
    }
  };

  return (
    <div className="contact-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '20px' }}>
      
      {/* MAIN RETRO WINDOW WRAPPER */}
      <div className="retro-window contact-window" style={{ maxWidth: '600px', width: '100%' }}>
        {/* Top Window Bar */}
        <div className="window-header">
          <h2 className="name-title">CONTACT_ME.EXE</h2>
        </div>
        
        <div className="window-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* ⭐ CONTACT INFORMATION PANEL (Retro Construct) */}
          <div className="info-panel" style={{ 
            backgroundColor: '#ffff00', 
            border: '2px solid #000', 
            padding: '15px', 
            boxShadow: '4px 4px 0px #000',
            fontFamily: 'monospace'
          }}>
            <h3 style={{ margin: '0 0 10px 0', fontFamily: 'Impact, sans-serif', letterSpacing: '1px' }}>📟 DIRECT CHANNELS</h3>
            <p style={{ margin: '4px 0' }}><strong>NAME:</strong> Czareena Canda</p>
            <p style={{ margin: '4px 0' }}><strong>PHONE:</strong> 365-275-7153</p>
            <p style={{ margin: '4px 0' }}><strong>EMAIL:</strong> candaczareena@gmail.com</p>
          </div>

          <hr style={{ border: 'none', borderTop: '2px solid #000', margin: '5px 0' }} />

          {statusMessage && (
            <p style={{ fontFamily: 'monospace', color: '#00E5FF', fontWeight: 'bold', margin: 0 }}>
              {statusMessage}
            </p>
          )}

          {/* ⭐ INTERACTIVE MESSAGE FORM */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ margin: '0 0 5px 0', fontFamily: 'Impact, sans-serif', letterSpacing: '1px' }}>✉️ SEND A MESSAGE</h3>
            
            {/* First & Last Name Rows */}
            <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
              <input 
                type="text"
                name="firstName" 
                placeholder="First Name" 
                value={form.firstName}
                onChange={handleChange} 
                style={{ width: '50%', padding: '10px', border: '2px solid #000', fontSize: '1rem', boxShadow: '2px 2px 0px #000' }}
                required 
              />
              <input 
                type="text"
                name="lastName" 
                placeholder="Last Name" 
                value={form.lastName}
                onChange={handleChange} 
                style={{ width: '50%', padding: '10px', border: '2px solid #000', fontSize: '1rem', boxShadow: '2px 2px 0px #000' }}
                required 
              />
            </div>

            {/* Contact Number Field */}
            <input 
              type="tel"
              name="number" 
              placeholder="Contact Number" 
              value={form.number}
              onChange={handleChange} 
              style={{ padding: '10px', border: '2px solid #000', fontSize: '1rem', boxShadow: '2px 2px 0px #000' }}
              required 
            />

            {/* Email Address Field */}
            <input 
              type="email"
              name="email" 
              placeholder="Email Address" 
              value={form.email}
              onChange={handleChange} 
              style={{ padding: '10px', border: '2px solid #000', fontSize: '1rem', boxShadow: '2px 2px 0px #000' }}
              required 
            />

            {/* Message Textarea Container */}
            <textarea 
              name="message" 
              placeholder="Type your message here..." 
              value={form.message}
              onChange={handleChange} 
              rows="4"
              style={{ padding: '10px', border: '2px solid #000', fontSize: '1rem', fontFamily: 'sans-serif', boxShadow: '2px 2px 0px #000', resize: 'vertical' }}
              required 
            />

            {/* Form Submit Trigger Button */}
            <button 
              type="submit" 
              className="resume-btn"
              style={{ 
                marginTop: '10px',
                padding: '12px',
                fontSize: '1.1rem',
                cursor: 'pointer',
                fontWeight: 'bold',
                backgroundColor: '#fff',
                border: '2px solid #000',
                boxShadow: '4px 4px 0px #000',
                fontFamily: 'Impact, sans-serif',
                letterSpacing: '1px'
              }}
            >
              SUBMIT MESSAGE ➔
            </button>
          </form>

          {/* ⭐ ADMIN-ONLY: RECEIVED MESSAGES LOG */}
          {auth && auth.user.role === 'admin' && (
            <div style={{ marginTop: '20px', borderTop: '2px dashed #000', paddingTop: '15px' }}>
              <h3 style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '1px', color: '#ff007f' }}>
                ⚙️ ADMIN PANEL: DATABASE MESSAGES
              </h3>
              {contacts.length === 0 ? (
                <p style={{ fontFamily: 'monospace' }}>No messages found in MongoDB.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {contacts.map((c) => (
                    <div key={c._id} style={{ 
                      backgroundColor: '#fff', 
                      border: '2px solid #000', 
                      padding: '10px', 
                      boxShadow: '2px 2px 0px #000',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div style={{ fontFamily: 'monospace' }}>
                        <p style={{ margin: 0 }}><strong>{c.firstname} {c.lastname}</strong></p>
                        <p style={{ margin: 0, color: '#555' }}>{c.email}</p>
                        {c.number && <p style={{ margin: 0, color: '#555' }}>{c.number}</p>}
                        {c.message && <p style={{ margin: '4px 0 0 0' }}>{c.message}</p>}
                      </div>
                      <button 
                        onClick={() => handleDelete(c._id)}
                        style={{
                          backgroundColor: '#ff0055',
                          color: '#fff',
                          border: '2px solid #000',
                          padding: '6px 12px',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          fontFamily: 'Impact, sans-serif'
                        }}
                      >
                        DELETE
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>

    </div>
  );
}