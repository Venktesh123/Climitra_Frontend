import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function Navbar() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    // window.location.href = '/' is called inside logout() already
  }

  return (
    <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid #e5e7eb',
      padding: '0.75rem 1.25rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontFamily: "'Montserrat', sans-serif",
      maxWidth: '430px',
      margin: '0 auto',
    }}>
      {/* LOGO */}
      <div
        style={{ display: 'flex', alignItems: 'center', gap: '7px', cursor: 'pointer' }}
        onClick={() => navigate('/dashboard')}
      >
        <svg width="22" height="22" viewBox="0 0 38 38" fill="none">
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

      {/* RIGHT SIDE */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {user && (
          <span style={{ fontSize: '0.68rem', color: '#6b7280', fontWeight: 600 }}>
            {user.name}
          </span>
        )}
        <button
          onClick={handleLogout}
          style={{
            background: 'none',
            border: '1.5px solid #e5e7eb',
            borderRadius: '20px',
            padding: '5px 12px',
            fontSize: '0.65rem',
            fontWeight: 700,
            color: '#374151',
            fontFamily: "'Montserrat', sans-serif",
            cursor: 'pointer',
            letterSpacing: '0.05em',
          }}
        >
          LOGOUT
        </button>
      </div>
    </div>
  )
}

export default Navbar