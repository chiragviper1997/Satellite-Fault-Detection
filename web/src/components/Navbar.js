import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const links = [
  { path: '/',        label: 'Home'    },
  { path: '/project', label: 'Project' },
  { path: '/demo',    label: 'Demo'    },
  { path: '/about',   label: 'About'   },
];

function Navbar() {
  const location = useLocation();
  const [hover, setHover]   = useState(null);

  return (
    <nav style={{
      position        : 'fixed',
      top             : 0,
      left            : 0,
      right           : 0,
      zIndex          : 100,
      display         : 'flex',
      alignItems      : 'center',
      justifyContent  : 'space-between',
      padding         : '16px 40px',
      background      : 'rgba(10,10,26,0.85)',
      backdropFilter  : 'blur(12px)',
      borderBottom    : '1px solid rgba(255,255,255,0.08)'
    }}>
      {/* logo */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        <span style={{
          fontSize  : '1.1rem',
          fontWeight: 700,
          background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
          WebkitBackgroundClip  : 'text',
          WebkitTextFillColor   : 'transparent'
        }}>
          ⚡ SatelliteFaultAI
        </span>
      </Link>

      {/* links */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {links.map(link => {
          const active = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              onMouseEnter={() => setHover(link.path)}
              onMouseLeave={() => setHover(null)}
              style={{
                textDecoration : 'none',
                padding        : '8px 18px',
                borderRadius   : '6px',
                fontSize       : '0.95rem',
                fontWeight     : active ? 600 : 400,
                color          : active || hover === link.path ? '#a78bfa' : '#94a3b8',
                background     : active ? 'rgba(167,139,250,0.1)' : 'transparent',
                transition     : 'all 0.2s'
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default Navbar;