import React from 'react';

export default function Services() {
  const services = [
    {
      title: "WEB DEVELOPMENT",
      desc: "Building highly responsive, interactive, and visually striking modern websites.",
      tech: "React | CSS | JavaScript",
      icon: "🌐"
    },
    {
      title: "PROGRAMMING",
      desc: "Writing robust software, custom script automation, and algorithm optimization.",
      tech: "Python | C# | SQL",
      icon: "💻"
    },
    {
      title: "MOBILE CONCEPTS",
      desc: "Designing intuitive workflows, feature specs, and functional interactive prototypes.",
      tech: "React Native | Flutter | UX Design",
      icon: "📱"
    }
  ];

  return (
    <div className="services-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <div className="retro-window services-window" style={{ maxWidth: '800px', width: '100%' }}>
        <div className="window-header">
          <h2 className="name-title">SERVICES.EXE</h2>
        </div>
        
        <div className="window-body">
          <p className="description" style={{ marginBottom: '25px', textAlign: 'center', fontWeight: 'bold' }}>
            TECHNICAL CAPABILITIES AND SERVICES I OFFER TO BRING SOLUTIONS TO LIFE.
          </p>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
            gap: '20px',
            width: '100%' 
          }}>
            {services.map((service, index) => (
              <div className="service-card" key={index} style={{ 
                border: '2px solid #000', 
                padding: '20px', 
                backgroundColor: '#fff', 
                boxShadow: '4px 4px 0px #000',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '10px' }}>{service.icon}</div>
                <h3 style={{ margin: '5px 0 10px 0', fontFamily: 'Impact, sans-serif', letterSpacing: '1px' }}>
                  {service.title}
                </h3>
                <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.4', fontWeight: '500', marginBottom: '15px' }}>
                  {service.desc}
                </p>

                {/* Interactive Tech Stack Reveal */}
                <div className="tech-stack">
                  {service.tech}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}