import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../api/authApi'

function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await loginUser(formData)
     // AFTER - correct
localStorage.setItem('token', response.data.token);
localStorage.setItem('user', JSON.stringify(response.data.user));
      setLoading(false)
      navigate('/dashboard')
    } catch (error) {
      console.log(error)
      setLoading(false)
      alert('Invalid Credentials')
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

        .cl-input {
          width: 100%;
          padding: 12px 14px;
          border-radius: 12px;
          border: 1.5px solid #d1d5db;
          background: #fff;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.85rem;
          color: #111827;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .cl-input:focus {
          border-color: #16a34a;
          box-shadow: 0 0 0 3px rgba(22,163,74,0.13);
        }
        .cl-login-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #166534 0%, #16a34a 55%, #22c55e 100%);
          border: none;
          border-radius: 50px;
          cursor: pointer;
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: 0.88rem;
          letter-spacing: 0.12em;
          color: #fff;
          box-shadow: 0 4px 18px rgba(22,163,74,0.38);
          transition: transform 0.18s, box-shadow 0.18s;
        }
        .cl-login-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(22,163,74,0.45);
        }
        .cl-login-btn:active { transform: scale(0.98); }
      `}</style>

      {/* CARD */}
      <div style={{
        width: '100%',
        maxWidth: '360px',
        background: 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.65)',
        borderRadius: '28px',
        padding: '2rem 1.75rem 1.75rem',
        boxShadow: '0 16px 48px rgba(0,0,0,0.14)',
      }}>

        {/* LOGO */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <svg width="34" height="34" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 28 Q10 10 28 10 Q28 20 20 24 L28 10" stroke="#166534" strokeWidth="2.2" fill="none" strokeLinejoin="round"/>
              <path d="M10 28 Q12 18 20 24" stroke="#166534" strokeWidth="2.2" fill="none"/>
              <rect x="14" y="20" width="2.5" height="5" rx="0.8" fill="#16a34a" opacity="0.85"/>
              <rect x="17.5" y="17" width="2.5" height="8" rx="0.8" fill="#16a34a"/>
              <rect x="21" y="19" width="2.5" height="6" rx="0.8" fill="#16a34a" opacity="0.85"/>
              <polyline points="14,20 18.5,16 23.5,18.5" stroke="#0284c7" strokeWidth="1.8" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
              <circle cx="23.5" cy="18.5" r="1.2" fill="#0284c7"/>
            </svg>
            <span style={{
              fontWeight: 800, fontSize: '1.4rem', letterSpacing: '0.07em',
              background: 'linear-gradient(135deg, #166534 30%, #0369a1 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>CLIMITRA</span>
          </div>
          <h2 style={{ margin: '0 0 3px', fontSize: '1.1rem', fontWeight: 700, color: '#111827', textAlign: 'center' }}>
            Welcome to Climitra
          </h2>
          <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280', fontWeight: 500 }}>
            Empowering Sustainable Action
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>

          {/* EMAIL */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
              Email Address
            </label>
            <input
              className="cl-input"
              type="email"
              name="email"
              placeholder="john.doe@email.com"
              onChange={handleChange}
              value={formData.email}
            />
          </div>

          {/* PASSWORD */}
          <div style={{ marginBottom: '0.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                className="cl-input"
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="••••••••"
                style={{ paddingRight: '42px' }}
                onChange={handleChange}
                value={formData.password}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#9ca3af', display: 'flex', alignItems: 'center', padding: 0,
                }}
              >
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

          {/* FORGOT */}
          <div style={{ textAlign: 'right', marginBottom: '1.25rem' }}>
            <button type="button" style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '0.72rem', color: '#2563eb',
              fontFamily: "'Montserrat', sans-serif", fontWeight: 500,
            }}>
              Forgot Password?
            </button>
          </div>

          <button className="cl-login-btn" type="submit">
            {loading ? 'Logging In...' : 'LOG IN'}
          </button>
        </form>

        {/* SIGN UP */}
        <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.72rem', color: '#4b5563' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#2563eb', fontWeight: 700, textDecoration: 'none' }}>
            Sign Up
          </Link>
        </div>

        {/* LEARN MORE */}
        <div style={{ textAlign: 'center', marginTop: '0.6rem' }}>
          <button style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#15803d', fontFamily: "'Montserrat', sans-serif",
            fontSize: '0.72rem', fontWeight: 600,
          }}>
            Learn More
          </button>
        </div>

      </div>
    </div>
  )
}

export default Login