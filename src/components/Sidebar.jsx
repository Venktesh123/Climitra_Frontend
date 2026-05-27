import { useNavigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const NAV_ITEMS = [
  { icon: '⌂', label: 'Dashboard', path: '/dashboard' },
  { icon: '↑', label: 'Upload',    path: '/upload' },
]

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()

  return (
    <aside style={{
      width: '220px',
      minHeight: '100svh',
      background: '#fff',
      borderRight: '1px solid #f3f4f6',
      display: 'flex',
      flexDirection: 'column',
      padding: '1.5rem 1rem',
      fontFamily: "'Montserrat', sans-serif",
      flexShrink: 0,
    }}>
      {/* LOGO */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2rem' }}>
        <svg width="24" height="24" viewBox="0 0 38 38" fill="none">
          <path d="M10 28 Q10 10 28 10 Q28 20 20 24 L28 10" stroke="#166534" strokeWidth="2.2" fill="none" strokeLinejoin="round"/>
          <path d="M10 28 Q12 18 20 24" stroke="#166534" strokeWidth="2.2" fill="none"/>
          <rect x="14" y="20" width="2.5" height="5" rx="0.8" fill="#16a34a" opacity="0.85"/>
          <rect x="17.5" y="17" width="2.5" height="8" rx="0.8" fill="#16a34a"/>
          <rect x="21" y="19" width="2.5" height="6" rx="0.8" fill="#16a34a" opacity="0.85"/>
          <polyline points="14,20 18.5,16 23.5,18.5" stroke="#0284c7" strokeWidth="1.8" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
          <circle cx="23.5" cy="18.5" r="1.2" fill="#0284c7"/>
        </svg>
        <span style={{
          fontWeight: 800, fontSize: '1rem', letterSpacing: '0.07em',
          background: 'linear-gradient(135deg, #166534 30%, #0369a1 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>CLIMITRA</span>
      </div>

      {/* NAV */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {NAV_ITEMS.map(({ icon, label, path }) => {
          const active = location.pathname === path
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '10px 12px', borderRadius: '10px', border: 'none',
                background: active ? '#f0fdf4' : 'none',
                color: active ? '#166534' : '#6b7280',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: active ? 700 : 500,
                fontSize: '0.8rem', cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              <span style={{ fontSize: '16px' }}>{icon}</span>
              {label}
            </button>
          )
        })}
      </nav>

      {/* USER + LOGOUT */}
      <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '1rem' }}>
        {user && (
          <div style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: 600, marginBottom: '8px', paddingLeft: '4px' }}>
            {user.name}<br/>
            <span style={{ fontSize: '0.62rem', color: '#9ca3af', fontWeight: 400 }}>{user.role}</span>
          </div>
        )}
        <button
          onClick={logout}
          style={{
            width: '100%', padding: '9px', borderRadius: '10px',
            border: '1.5px solid #fee2e2', background: '#fff',
            color: '#ef4444', fontFamily: "'Montserrat', sans-serif",
            fontWeight: 700, fontSize: '0.72rem', cursor: 'pointer',
            letterSpacing: '0.05em',
          }}
        >
          LOGOUT
        </button>
      </div>
    </aside>
  )
}

export default Sidebar