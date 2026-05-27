import { useState } from 'react'
import { Link } from 'react-router-dom'
import { registerUser } from '../api/authApi'

const ROLES = [
  { value: 'FIELD_AGENT', label: 'Field Agent', icon: '📍' },
  { value: 'REVIEWER',    label: 'Reviewer',    icon: '👁' },
  { value: 'ADMIN',       label: 'Admin',       icon: '🛡' },
]

function Register() {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'FIELD_AGENT',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleRole = (role) =>
    setFormData({ ...formData, role })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      await registerUser(formData)
      alert('User Registered')
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100svh',
      backgroundImage: "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      fontFamily: "'Montserrat', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        .rg-input {
          width: 100%; padding: 11px 14px; border-radius: 12px;
          border: 1.5px solid #d1d5db; background: #fff;
          font-family: 'Montserrat', sans-serif; font-size: 0.85rem; color: #111827;
          outline: none; transition: border-color 0.2s, box-shadow 0.2s;
        }
        .rg-input:focus { border-color: #16a34a; box-shadow: 0 0 0 3px rgba(22,163,74,0.13); }
        .rg-role-btn {
          flex: 1; padding: 9px 4px; border-radius: 10px; border: 1.5px solid #d1d5db;
          background: #fff; cursor: pointer; text-align: center;
          font-family: 'Montserrat', sans-serif; font-size: 0.65rem; font-weight: 600;
          color: #6b7280; transition: all 0.18s; line-height: 1.4;
        }
        .rg-role-btn.active { border-color: #16a34a; background: #f0fdf4; color: #166534; }
        .rg-submit {
          width: 100%; padding: 13px;
          background: linear-gradient(135deg, #166534 0%, #16a34a 55%, #22c55e 100%);
          border: none; border-radius: 50px; cursor: pointer;
          font-family: 'Montserrat', sans-serif; font-weight: 700;
          font-size: 0.85rem; letter-spacing: 0.12em; color: #fff;
          box-shadow: 0 4px 18px rgba(22,163,74,0.38);
          transition: transform 0.18s, box-shadow 0.18s;
        }
        .rg-submit:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(22,163,74,0.45); }
        .rg-submit:active { transform: scale(0.98); }
      `}</style>

      {/* CARD */}
      <div style={{
        width: '100%', maxWidth: '360px',
        background: 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.65)',
        borderRadius: '28px', padding: '1.75rem 1.75rem 1.5rem',
        boxShadow: '0 16px 48px rgba(0,0,0,0.14)',
      }}>

        {/* LOGO */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
            <svg width="30" height="30" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 28 Q10 10 28 10 Q28 20 20 24 L28 10" stroke="#166534" strokeWidth="2.2" fill="none" strokeLinejoin="round"/>
              <path d="M10 28 Q12 18 20 24" stroke="#166534" strokeWidth="2.2" fill="none"/>
              <rect x="14" y="20" width="2.5" height="5" rx="0.8" fill="#16a34a" opacity="0.85"/>
              <rect x="17.5" y="17" width="2.5" height="8" rx="0.8" fill="#16a34a"/>
              <rect x="21" y="19" width="2.5" height="6" rx="0.8" fill="#16a34a" opacity="0.85"/>
              <polyline points="14,20 18.5,16 23.5,18.5" stroke="#0284c7" strokeWidth="1.8" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
              <circle cx="23.5" cy="18.5" r="1.2" fill="#0284c7"/>
            </svg>
            <span style={{
              fontWeight: 800, fontSize: '1.3rem', letterSpacing: '0.07em',
              background: 'linear-gradient(135deg, #166534 30%, #0369a1 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>CLIMITRA</span>
          </div>
          <h2 style={{ margin: '0 0 3px', fontSize: '1rem', fontWeight: 700, color: '#111827', textAlign: 'center' }}>
            Create your account
          </h2>
          <p style={{ margin: 0, fontSize: '0.72rem', color: '#6b7280', fontWeight: 500 }}>
            Empowering Sustainable Action
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* NAME */}
          <div style={{ marginBottom: '0.9rem' }}>
            <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#374151', marginBottom: '5px' }}>
              Full Name
            </label>
            <input className="rg-input" type="text" name="name" placeholder="John Doe"
              onChange={handleChange} value={formData.name} />
          </div>

          {/* EMAIL */}
          <div style={{ marginBottom: '0.9rem' }}>
            <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#374151', marginBottom: '5px' }}>
              Email Address
            </label>
            <input className="rg-input" type="email" name="email" placeholder="john.doe@email.com"
              onChange={handleChange} value={formData.email} />
          </div>

          {/* PASSWORD */}
          <div style={{ marginBottom: '0.9rem' }}>
            <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#374151', marginBottom: '5px' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input className="rg-input" type={showPassword ? 'text' : 'password'} name="password"
                placeholder="••••••••" style={{ paddingRight: '42px' }}
                onChange={handleChange} value={formData.password} />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af',
                  display: 'flex', alignItems: 'center', padding: 0,
                }}>
                {showPassword ? (
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* ROLE */}
          <div style={{ marginBottom: '0.9rem' }}>
            <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#374151', marginBottom: '5px' }}>
              Role
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {ROLES.map(({ value, label, icon }) => (
                <button
                  key={value}
                  type="button"
                  className={`rg-role-btn${formData.role === value ? ' active' : ''}`}
                  onClick={() => handleRole(value)}
                >
                  <span style={{ fontSize: '16px', display: 'block', marginBottom: '3px' }}>{icon}</span>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <button className="rg-submit" type="submit">
            {loading ? 'Registering...' : 'REGISTER'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.72rem', color: '#4b5563' }}>
          Already have an account?{' '}
          <Link to="/" style={{ color: '#2563eb', fontWeight: 700, textDecoration: 'none' }}>
            Sign In
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Register