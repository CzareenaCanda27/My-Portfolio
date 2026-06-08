import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Contact() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    number: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Log the captured data to your console for verification
    console.log("Form Captured Data:", form); 
    
    // 2. Format the mailto string with clean templates and spacing
    const emailTarget = "candaczareena@gmail.com";
    const subject = encodeURIComponent(`Portfolio Message from ${form.firstName} ${form.lastName}`);
    const body = encodeURIComponent(
      `Name: ${form.firstName} ${form.lastName}\n` +
      `Phone: ${form.number}\n` +
      `Email: ${form.email}\n\n` +
      `Message:\n${form.message}`
    );
    
    // 3. Trigger the browser to open the user's local email application
    window.location.href = `mailto:${emailTarget}?subject=${subject}&body=${body}`;
    
    // 4. Alert the user and seamlessly redirect them back to the Home page
    alert(`Redirecting to your email client to send the message! Thank you, ${form.firstName}.`);
    navigate("/");
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

        </div>
      </div>

    </div>
  );
}