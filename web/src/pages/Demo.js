import React, { useState } from 'react';

const sensors = [
  { key: 'battery_voltage',    label: 'Battery Voltage',     unit: 'V',   min: 15,  max: 30,   step: 0.1, normal: 26.0  },
  { key: 'solar_current',      label: 'Solar Current',       unit: 'A',   min: 0,   max: 4,    step: 0.1, normal: 2.5   },
  { key: 'panel_temp',         label: 'Panel Temperature',   unit: 'C',   min: -10, max: 100,  step: 0.5, normal: 25.0  },
  { key: 'onboard_temp',       label: 'Onboard Temperature', unit: 'C',   min: 10,  max: 70,   step: 0.5, normal: 28.0  },
  { key: 'attitude_error',     label: 'Attitude Error',      unit: 'deg', min: 0,   max: 6,    step: 0.1, normal: 0.2   },
  { key: 'reaction_wheel_rpm', label: 'Reaction Wheel RPM',  unit: 'RPM', min: 0,   max: 5500, step: 10,  normal: 3000  },
];

const nominalPreset = {
  battery_voltage: 26.0, solar_current: 2.5, panel_temp: 25.0,
  onboard_temp: 28.0, attitude_error: 0.2, reaction_wheel_rpm: 3000
};

const faultPreset = {
  battery_voltage: 19.0, solar_current: 0.1, panel_temp: 88.0,
  onboard_temp: 55.0, attitude_error: 3.5, reaction_wheel_rpm: 50
};

function Demo() {
  const [values,  setValues]  = useState(nominalPreset);
  const [result,  setResult]  = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const handleChange = (key, val) => {
    setValues(prev => ({ ...prev, [key]: parseFloat(val) }));
    setResult(null);
  };

  const predict = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('http://127.0.0.1:8000/predict', {
        method  : 'POST',
        headers : { 'Content-Type': 'application/json' },
        body    : JSON.stringify(values)
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      setError('Cannot connect to API. Make sure the FastAPI server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page" style={{ position: 'relative', zIndex: 1 }}>

      <h1 className="section-title">Live Fault Detection</h1>
      <p className="section-sub">
        Adjust sensor values and run the SLP model to classify satellite health.
      </p>

      {/* preset buttons */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <button onClick={() => { setValues(nominalPreset); setResult(null); }}
          style={{
            background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)',
            color: '#4ade80', padding: '8px 20px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem'
          }}>
          Load Nominal Values
        </button>
        <button onClick={() => { setValues(faultPreset); setResult(null); }}
          style={{
            background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)',
            color: '#f87171', padding: '8px 20px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem'
          }}>
          Load Fault Values
        </button>
      </div>

      {/* model note */}
      <div className="card" style={{
        borderColor: 'rgba(167,139,250,0.3)',
        marginBottom: '24px',
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-start'
      }}>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
          <strong style={{ color: '#a78bfa' }}>How the model works:</strong> This SLP was
          trained on multi-sensor fault patterns where all 6 sensors show anomalies
          simultaneously. Changing a single sensor may not trigger a fault prediction.
          Use <strong style={{ color: '#f87171' }}>Load Fault Values</strong> to see a
          correlated fault event across all sensors.
        </p>
      </div>

      {/* sensor sliders */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {sensors.map(s => (
          <div key={s.key} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{s.label}</span>
              <span style={{
                color: '#a78bfa', fontWeight: 700, fontSize: '1rem',
                background: 'rgba(167,139,250,0.1)', padding: '2px 10px', borderRadius: '4px'
              }}>
                {values[s.key]} {s.unit}
              </span>
            </div>
            <input
              type="range"
              min={s.min} max={s.max} step={s.step}
              value={values[s.key]}
              onChange={e => handleChange(s.key, e.target.value)}
              style={{ width: '100%', accentColor: '#a78bfa', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
              <span>{s.min} {s.unit}</span>
              <span>{s.max} {s.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* predict button */}
      <button
        className="btn-primary"
        onClick={predict}
        disabled={loading}
        style={{ fontSize: '1rem', padding: '14px 40px', marginBottom: '32px', opacity: loading ? 0.7 : 1 }}
      >
        {loading ? 'Analysing...' : 'Run Prediction'}
      </button>

      {/* error */}
      {error && (
        <div className="card" style={{ borderColor: 'rgba(248,113,113,0.3)', color: '#f87171', marginBottom: '24px' }}>
          {error}
        </div>
      )}

      {/* result */}
      {result && (
        <div className="card" style={{
          borderColor: result.label === 'Nominal' ? 'rgba(74,222,128,0.4)' : 'rgba(248,113,113,0.4)',
          background : result.label === 'Nominal' ? 'rgba(74,222,128,0.05)' : 'rgba(248,113,113,0.05)',
          textAlign  : 'center',
          padding    : '40px'
        }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '12px' }}>
            {result.label === 'Nominal' ? 'OK' : 'ALERT'}
          </div>
          <div style={{
            fontSize  : '2.5rem',
            fontWeight: 800,
            color     : result.label === 'Nominal' ? '#4ade80' : '#f87171',
            marginBottom: '8px'
          }}>
            {result.label}
          </div>
          <div style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            Model confidence score: <strong style={{ color: '#ffffff' }}>{result.confidence}</strong>
          </div>
        </div>
      )}

    </div>
  );
}

export default Demo;