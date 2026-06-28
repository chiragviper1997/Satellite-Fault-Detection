import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="page" style={{ 
      display        : 'flex', 
      flexDirection  : 'column', 
      justifyContent : 'center',
      minHeight      : '100vh',
      position       : 'relative',
      zIndex         : 1
    }}>

      {/* tag line */}
      <div style={{
        display      : 'inline-block',
        background   : 'rgba(167,139,250,0.1)',
        border       : '1px solid rgba(167,139,250,0.3)',
        borderRadius : '20px',
        padding      : '6px 16px',
        fontSize     : '0.85rem',
        color        : '#a78bfa',
        marginBottom : '24px',
        width        : 'fit-content'
      }}>
        🛰️ Machine Learning · Satellite Systems · Fault Detection
      </div>

      {/* title */}
      <h1 style={{
        fontSize  : 'clamp(2.5rem, 6vw, 4.5rem)',
        fontWeight: 800,
        lineHeight: 1.1,
        marginBottom: '24px'
      }}>
        Satellite{' '}
        <span style={{
          background            : 'linear-gradient(135deg, #a78bfa, #60a5fa)',
          WebkitBackgroundClip  : 'text',
          WebkitTextFillColor   : 'transparent'
        }}>
          Fault Detection
        </span>
        <br />using SLP
      </h1>

      {/* description */}
      <p style={{
        fontSize    : '1.15rem',
        color       : '#94a3b8',
        maxWidth    : '600px',
        lineHeight  : 1.7,
        marginBottom: '40px'
      }}>
        A Single Layer Perceptron built from scratch using NumPy that classifies 
        satellite telemetry as <strong style={{ color: '#4ade80' }}>Nominal</strong> or{' '}
        <strong style={{ color: '#f87171' }}>Fault</strong> in real time.
        Powered by a FastAPI backend and deployed on the web.
      </p>

      {/* buttons */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <Link to="/demo">
          <button className="btn-primary" style={{ fontSize: '1rem', padding: '14px 32px' }}>
            🚀 Try the Demo
          </button>
        </Link>
        <Link to="/project">
          <button style={{
            background   : 'transparent',
            border       : '1px solid rgba(255,255,255,0.2)',
            color        : '#ffffff',
            padding      : '14px 32px',
            borderRadius : '8px',
            fontSize     : '1rem',
            cursor       : 'pointer',
            transition   : 'border-color 0.2s'
          }}>
            Learn More →
          </button>
        </Link>
        <a href="https://github.com/chiragviper1997/Satellite-Fault-Detection" 
           target="_blank" rel="noreferrer">
          <button style={{
            background   : 'transparent',
            border       : '1px solid rgba(255,255,255,0.2)',
            color        : '#ffffff',
            padding      : '14px 32px',
            borderRadius : '8px',
            fontSize     : '1rem',
            cursor       : 'pointer'
          }}>
            GitHub ↗
          </button>
        </a>
      </div>

      {/* stats row */}
      <div style={{ 
        display  : 'flex', 
        gap      : '40px', 
        marginTop: '80px',
        flexWrap : 'wrap'
      }}>
        {[
          { value: '1000',  label: 'Training samples' },
          { value: '6',     label: 'Sensor channels'  },
          { value: '100%',  label: 'Val accuracy'     },
          { value: 'NumPy', label: 'Built with'       },
        ].map(stat => (
          <div key={stat.label}>
            <div style={{ 
              fontSize  : '2rem', 
              fontWeight: 700,
              background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
              WebkitBackgroundClip : 'text',
              WebkitTextFillColor  : 'transparent'
            }}>
              {stat.value}
            </div>
            <div style={{ color: '#64748b', fontSize: '0.9rem' }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;