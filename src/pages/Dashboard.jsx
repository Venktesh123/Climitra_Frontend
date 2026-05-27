import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCapturesApi } from '../api/captureApi'

const statusStyle = {
  APPROVED:  { background: '#d1fae5', color: '#065f46', label: 'APPROVED' },
  PENDING:   { background: '#fef3c7', color: '#92400e', label: 'PENDING' },
  QUEUED:    { background: '#fef3c7', color: '#92400e', label: 'QUEUED' },
  REJECTED:  { background: '#fee2e2', color: '#991b1b', label: 'REJECTED' },
  IN_REVIEW: { background: '#dbeafe', color: '#1e40af', label: 'IN REVIEW' },
  PENDING_REVIEW: { background: '#dbeafe', color: '#1e40af', label: 'IN REVIEW' },
}

function Dashboard() {
  const navigate = useNavigate()
  const [captures, setCaptures] = useState([])

  const getCaptures = async () => {
    try {
      const response = await getCapturesApi()
      setCaptures(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => { getCaptures() }, [])

  const counts = {
    total:    captures.length,
    pending:  captures.filter(c => c.status === 'PENDING' || c.status === 'QUEUED' || c.status === 'PENDING_REVIEW').length,
    approved: captures.filter(c => c.status === 'APPROVED').length,
    rejected: captures.filter(c => c.status === 'REJECTED').length,
  }

  return (
    <div style={{
      minHeight: '100svh',
      background: '#f1f5f4',
      fontFamily: "'Montserrat', sans-serif",
      maxWidth: '430px',
      margin: '0 auto',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .db-upload-btn {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          width: 100%; padding: 13px; border-radius: 50px; border: none; cursor: pointer;
          background: linear-gradient(135deg, #166534 0%, #16a34a 55%, #22c55e 100%);
          color: #fff; font-family: 'Montserrat', sans-serif; font-weight: 700;
          font-size: 0.82rem; letter-spacing: 0.08em; margin-bottom: 1rem;
          box-shadow: 0 4px 14px rgba(22,163,74,0.32);
          transition: transform 0.18s;
        }
        .db-upload-btn:hover { transform: translateY(-1px); }
        .db-card { background: #fff; border-radius: 16px; overflow: hidden;
          margin-bottom: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.06); }
        .db-nav-item { display: flex; flex-direction: column; align-items: center; gap: 3px;
          background: none; border: none; cursor: pointer; padding: 0 8px; }
      `}</style>

      {/* HEADER */}
      <div style={{
        background: 'linear-gradient(135deg, #166534 0%, #16a34a 60%, #22c55e 100%)',
        padding: '1.5rem 1.25rem 3.5rem', position: 'relative',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <svg width="26" height="26" viewBox="0 0 38 38" fill="none">
              <path d="M10 28 Q10 10 28 10 Q28 20 20 24 L28 10" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinejoin="round"/>
              <path d="M10 28 Q12 18 20 24" stroke="#fff" strokeWidth="2.2" fill="none"/>
              <rect x="14" y="20" width="2.5" height="5" rx="0.8" fill="rgba(255,255,255,0.8)"/>
              <rect x="17.5" y="17" width="2.5" height="8" rx="0.8" fill="#fff"/>
              <rect x="21" y="19" width="2.5" height="6" rx="0.8" fill="rgba(255,255,255,0.8)"/>
              <polyline points="14,20 18.5,16 23.5,18.5" stroke="#bfdbfe" strokeWidth="1.8" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
              <circle cx="23.5" cy="18.5" r="1.2" fill="#bfdbfe"/>
            </svg>
            <span style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '0.06em', color: '#fff' }}>CLIMITRA</span>
          </div>
          <div style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.25)', border: '1.5px solid rgba(255,255,255,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.72rem', fontWeight: 700, color: '#fff',
          }}>JD</div>
        </div>
        <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.72rem', fontWeight: 500, marginBottom: '3px' }}>
          Good morning 👋
        </div>
        <div style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 700 }}>Dashboard</div>
        <svg style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'block' }}
          viewBox="0 0 375 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 20 Q90 0 187 20 Q280 40 375 15 L375 40 L0 40 Z" fill="#f1f5f4"/>
        </svg>
      </div>

      {/* STATS */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: '10px',
        padding: '0 1.25rem', marginTop: '-1.5rem', marginBottom: '1rem', position: 'relative', zIndex: 2,
      }}>
        {[
          { label: 'Total Captures', val: counts.total,    sub: 'This month', dot: '#16a34a' },
          { label: 'Pending Review', val: counts.pending,  sub: 'Awaiting',   dot: '#f59e0b' },
          { label: 'Approved',       val: counts.approved, sub: 'Verified',   dot: '#22c55e' },
          { label: 'Rejected',       val: counts.rejected, sub: 'Needs fix',  dot: '#ef4444' },
        ].map(({ label, val, sub, dot }) => (
          <div key={label} style={{
            background: '#fff', borderRadius: '14px', padding: '12px 14px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
          }}>
            <div style={{ fontSize: '0.65rem', color: '#6b7280', fontWeight: 600, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827' }}>{val}</div>
            <div style={{ fontSize: '0.62rem', color: '#6b7280', marginTop: '2px' }}>
              <span style={{ display: 'inline-block', width: '7px', height: '7px', borderRadius: '50%', background: dot, marginRight: '4px', verticalAlign: 'middle' }}></span>
              {sub}
            </div>
          </div>
        ))}
      </div>

      {/* CAPTURES */}
      <div style={{ padding: '0 1.25rem', paddingBottom: '80px' }}>
        <button className="db-upload-btn" onClick={() => navigate('/upload')}>
          ↑ NEW CAPTURE
        </button>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827' }}>Recent Captures</span>
          <button style={{ fontSize: '0.7rem', color: '#16a34a', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            See all →
          </button>
        </div>

        {captures.length === 0 && (
          <div style={{ textAlign: 'center', color: '#9ca3af', fontSize: '0.8rem', padding: '2rem 0' }}>
            No captures yet. Upload your first one!
          </div>
        )}

        {captures.map((capture) => {
          const badge = statusStyle[capture.status] || statusStyle.PENDING
          return (
            <div key={capture.id} className="db-card" onClick={() => navigate(`/review/${capture.id}`)} style={{ cursor: 'pointer' }}>
              <img
                src={capture.blobUrl}
                alt={capture.documentType}
                style={{ width: '100%', height: '130px', objectFit: 'cover', display: 'block' }}
                onError={(e) => { e.target.style.display = 'none' }}
              />
              <div style={{ padding: '10px 14px 12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#111827' }}>{capture.documentType}</span>
                  <span style={{
                    fontSize: '0.6rem', fontWeight: 700, padding: '3px 9px', borderRadius: '50px',
                    letterSpacing: '0.04em', background: badge.background, color: badge.color,
                  }}>{badge.label}</span>
                </div>
                {capture.uploadedAt && (
                  <div style={{ fontSize: '0.62rem', color: '#9ca3af', marginTop: '3px' }}>
                    {new Date(capture.uploadedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* BOTTOM NAV */}
      <div style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: '430px',
        background: '#fff', borderTop: '1px solid #f3f4f6',
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        padding: '10px 0 14px',
      }}>
        {[
          { icon: '⌂', label: 'Home',     path: '/dashboard' },
          { icon: '↑', label: 'Upload',   path: '/upload' },
          { icon: '☰', label: 'Captures', path: '/dashboard' },
          { icon: '👤', label: 'Profile', path: '/dashboard' },
        ].map(({ icon, label, path }) => (
          <button key={label} className="db-nav-item" onClick={() => navigate(path)}>
            <span style={{ fontSize: '18px', color: label === 'Home' ? '#16a34a' : '#9ca3af' }}>{icon}</span>
            <span style={{ fontSize: '0.55rem', fontWeight: 600, color: label === 'Home' ? '#16a34a' : '#9ca3af', fontFamily: "'Montserrat', sans-serif" }}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Dashboard