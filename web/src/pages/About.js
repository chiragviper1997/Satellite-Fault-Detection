import React from 'react';

const skills = [
  'Python', 'NumPy', 'pandas', 'scikit-learn',
  'FastAPI', 'React', 'Machine Learning', 'Space Tech'
];

const links = [
  { label: 'GitHub',   url: 'https://github.com/chiragviper1997',                        icon: 'GH', color: '#a78bfa' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/chirag-bathla-636b81152/',      icon: 'LI', color: '#60a5fa' },
  { label: 'Email',    url: 'mailto:chiragbathla19@gmail.com',                           icon: '@',  color: '#4ade80' },
];

function About() {
  return (
    <div className="page" style={{ position: 'relative', zIndex: 1 }}>

      <h1 className="section-title">About Me</h1>
      <p className="section-sub">The person behind this project.</p>

      <div className="card" style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
          <div style={{
            width: '72px', height: '72px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2rem', flexShrink: 0
          }}>
            CB
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Chirag Bathla</h2>
            <p style={{ color: '#94a3b8', marginTop: '4px' }}>
              ML Engineer · Space Tech Enthusiast · Software Developer
            </p>
          </div>
        </div>

        <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '1rem', marginBottom: '24px' }}>
          I am passionate about Machine Learning, Space Technology, and Software Engineering.
          This project explores how ML fundamentals — specifically a Single Layer Perceptron
          built from scratch — can be applied to real-world aerospace problems like satellite
          fault detection. I built every component of this system end to end: the data pipeline,
          the model, the API, and this website.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {skills.map(skill => (
            <span key={skill} style={{
              background: 'rgba(167,139,250,0.1)',
              border: '1px solid rgba(167,139,250,0.2)',
              color: '#a78bfa', padding: '4px 14px',
              borderRadius: '20px', fontSize: '0.85rem'
            }}>
              {skill}
            </span>
          ))}
        </div>
      </div>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '16px' }}>Get in Touch</h2>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        {links.map(link => (
          <a key={link.label} href={link.url} target="_blank" rel="noreferrer"
            style={{ textDecoration: 'none' }}>
            <div className="card" style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '16px 24px', cursor: 'pointer', minWidth: '160px',
              borderColor: 'rgba(167,139,250,0.3)'
            }}>
              <span style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: link.color, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontSize: '0.75rem', fontWeight: 700, color: '#0a0a1a'
              }}>
                {link.icon}
              </span>
              <span style={{ color: link.color, fontWeight: 600 }}>{link.label}</span>
            </div>
          </a>
        ))}
      </div>

      <div className="card" style={{ marginTop: '40px', borderColor: 'rgba(167,139,250,0.3)' }}>
        <div style={{ fontSize: '0.85rem', color: '#a78bfa', fontWeight: 700, marginBottom: '8px' }}>
          PROJECT REPOSITORY
        </div>
        <a href="https://github.com/chiragviper1997/Satellite-Fault-Detection"
          target="_blank" rel="noreferrer"
          style={{ color: '#60a5fa', textDecoration: 'none', fontSize: '0.95rem' }}>
          github.com/chiragviper1997/Satellite-Fault-Detection
        </a>
      </div>

    </div>
  );
}

export default About;