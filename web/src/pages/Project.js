import React from 'react';

const pipeline = [
  { step: '01', title: 'Data Generator',  desc: 'Synthetic satellite telemetry with injected fault events across 6 sensor channels.' },
  { step: '02', title: 'Data Loader',     desc: 'Loads synthetic or real ESA OPSSAT-AD data with a single source argument.' },
  { step: '03', title: 'Preprocessor',    desc: 'Min-max normalization, low-variance column removal, stratified train/val split.' },
  { step: '04', title: 'NumPy SLP',       desc: 'Single Layer Perceptron from scratch. Perceptron learning rule, no ML frameworks.' },
  { step: '05', title: 'Evaluate',        desc: 'Accuracy, precision, recall, F1 score, confusion matrix, loss curve plots.' },
  { step: '06', title: 'FastAPI Backend', desc: 'Serves predictions via POST /predict. Loads trained weights, returns label + confidence.' },
];

const sensors = [
  { name: 'battery_voltage',    subsystem: 'Power',   normal: '24–28 V',        fault: '18–21 V'    },
  { name: 'solar_current',      subsystem: 'Power',   normal: '1.5–3.5 A',      fault: '0–0.2 A'    },
  { name: 'panel_temp',         subsystem: 'Thermal', normal: '-10 to 60 °C',   fault: '80–95 °C'   },
  { name: 'onboard_temp',       subsystem: 'Thermal', normal: '15–35 °C',       fault: '50–65 °C'   },
  { name: 'attitude_error',     subsystem: 'ADCS',    normal: '0–0.5 deg',      fault: '2–5 deg'    },
  { name: 'reaction_wheel_rpm', subsystem: 'ADCS',    normal: '1000–5000 RPM',  fault: '0–100 RPM'  },
];

const metrics = [
  { model: 'NumPy SLP',         accuracy: '1.0000', precision: '1.0000', recall: '1.0000', f1: '1.0000' },
  { model: 'sklearn Perceptron', accuracy: '1.0000', precision: '1.0000', recall: '1.0000', f1: '1.0000' },
];

function Project() {
  return (
    <div className="page" style={{ position: 'relative', zIndex: 1 }}>

      <h1 className="section-title">How It Works</h1>
      <p className="section-sub">
        End-to-end pipeline from synthetic data generation to real-time prediction.
      </p>

      {/* pipeline */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '60px' }}>
        {pipeline.map(p => (
          <div key={p.step} className="card">
            <div style={{ fontSize: '0.8rem', color: '#a78bfa', fontWeight: 700, marginBottom: '8px' }}>
              STEP {p.step}
            </div>
            <div style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '8px' }}>{p.title}</div>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>{p.desc}</div>
          </div>
        ))}
      </div>

      {/* sensors table */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '16px' }}>Sensor Channels</h2>
      <div className="card" style={{ marginBottom: '60px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ color: '#64748b', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Sensor</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Subsystem</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Normal Range</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Fault Signature</th>
            </tr>
          </thead>
          <tbody>
            {sensors.map(s => (
              <tr key={s.name} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#a78bfa' }}>{s.name}</td>
                <td style={{ padding: '12px 16px', color: '#94a3b8' }}>{s.subsystem}</td>
                <td style={{ padding: '12px 16px', color: '#4ade80' }}>{s.normal}</td>
                <td style={{ padding: '12px 16px', color: '#f87171' }}>{s.fault}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* results */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '16px' }}>Results</h2>
      <div className="card" style={{ marginBottom: '60px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ color: '#64748b', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Model</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Accuracy</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Precision</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Recall</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>F1</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map(m => (
              <tr key={m.model} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>{m.model}</td>
                <td style={{ padding: '12px 16px', color: '#4ade80' }}>{m.accuracy}</td>
                <td style={{ padding: '12px 16px', color: '#4ade80' }}>{m.precision}</td>
                <td style={{ padding: '12px 16px', color: '#4ade80' }}>{m.recall}</td>
                <td style={{ padding: '12px 16px', color: '#4ade80' }}>{m.f1}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* limitation note */}
      <div className="card" style={{ borderColor: 'rgba(167,139,250,0.3)' }}>
        <div style={{ fontSize: '0.85rem', color: '#a78bfa', fontWeight: 700, marginBottom: '8px' }}>
          LIMITATION & NEXT STEPS
        </div>
        <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: '0.95rem' }}>
          The SLP achieves perfect accuracy on synthetic data because fault signatures were 
          designed with clear separation from normal ranges. Real satellite telemetry will 
          produce overlapping classes and lower accuracy. Phase 2 will test this model on 
          real ESA OPSSAT-AD telemetry, and Phase 3 will extend to a Multi-Layer Perceptron 
          to handle non-linear fault boundaries.
        </p>
      </div>

    </div>
  );
}

export default Project;