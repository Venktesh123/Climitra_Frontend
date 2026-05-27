import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../api/axios'
import Loader from '../components/Loader'

const EVENT_STYLE = {
  APPROVED:      { bg: '#d1fae5', color: '#065f46', icon: '✓' },
  REJECTED:      { bg: '#fee2e2', color: '#991b1b', icon: '✕' },
  FIELD_UPDATED: { bg: '#dbeafe', color: '#1e40af', icon: '✎' },
  OCR_COMPLETED: { bg: '#f0fdf4', color: '#166534', icon: '⚙' },
}

function AuditPage() {
  const { captureId } = useParams()
  const navigate = useNavigate()

  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)

  const getAuditLogs = async () => {
    try {
      const response = await API.get(`/audit/${captureId}`)
      setLogs(response.data.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { getAuditLogs() }, [])

  if (loading) return <Loader message="Loading Audit Trail..." />

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
      `}</style>

      {/* HEADER */}
      <div style={{
        background: 'linear-gradient(135deg, #166534 0%, #16a34a 60%, #22c55e 100%)',
        padding: '1.5rem 1.25rem 3.2rem', position: 'relative',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
          <button onClick={() => navigate(-1)} style={{
            background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%',
            width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#fff', fontSize: '18px',
          }}>‹</button>
          <span style={{ fontWeight: 800, fontSize: '1.05rem', color: '#fff', letterSpacing: '0.06em' }}>
            CLIMITRA
          </span>
        </div>
        <div style={{ color: '#fff', fontSize: '1.15rem', fontWeight: 700 }}>Audit Trail</div>
        <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.72rem', marginTop: '3px', fontWeight: 500 }}>
          {logs.length} event{logs.length !== 1 ? 's' : ''} recorded
        </div>
        <svg style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'block' }}
          viewBox="0 0 375 40" preserveAspectRatio="none">
          <path d="M0 20 Q90 0 187 20 Q280 40 375 15 L375 40 L0 40 Z" fill="#f1f5f4"/>
        </svg>
      </div>

      <div style={{ padding: '0 1.25rem 2rem', marginTop: '-1rem', position: 'relative', zIndex: 2 }}>

        {logs.length === 0 && (
          <div style={{
            background: '#fff', borderRadius: '16px', padding: '2rem',
            textAlign: 'center', color: '#9ca3af', fontSize: '0.8rem',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          }}>
            No audit events found for this capture.
          </div>
        )}

        {/* TIMELINE */}
        <div style={{ position: 'relative' }}>
          {/* vertical line */}
          {logs.length > 1 && (
            <div style={{
              position: 'absolute', left: '19px', top: '24px',
              bottom: '24px', width: '2px', background: '#e5e7eb', zIndex: 0,
            }} />
          )}

          {logs.map((log) => {
            const style = EVENT_STYLE[log.eventType] || { bg: '#f3f4f6', color: '#374151', icon: '•' }
            return (
              <div key={log.id} style={{ display: 'flex', gap: '12px', marginBottom: '12px', position: 'relative', zIndex: 1 }}>

                {/* ICON CIRCLE */}
                <div style={{
                  width: '38px', height: '38px', borderRadius: '50%', flexShrink: 0,
                  background: style.bg, color: style.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '14px', fontWeight: 700,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                }}>
                  {style.icon}
                </div>

                {/* CARD */}
                <div style={{
                  flex: 1, background: '#fff', borderRadius: '14px',
                  padding: '10px 14px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <span style={{
                      fontSize: '0.72rem', fontWeight: 700,
                      background: style.bg, color: style.color,
                      padding: '2px 8px', borderRadius: '20px',
                    }}>
                      {log.eventType.replace('_', ' ')}
                    </span>
                    <span style={{ fontSize: '0.58rem', color: '#9ca3af', fontWeight: 500, marginLeft: '6px', flexShrink: 0 }}>
                      {new Date(log.createdAt).toLocaleString('en-IN', {
                        month: 'short', day: 'numeric',
                        hour: '2-digit', minute: '2-digit',
                      })}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.68rem', color: '#6b7280', lineHeight: '1.6' }}>
                    <span style={{ fontWeight: 600, color: '#374151' }}>
                      {log.actorType === 'HUMAN' ? '👤' : '🤖'} {log.actorType}
                    </span>
                    {' · '}
                    <span>ID: {log.actorId?.slice(0, 8)}…</span>
                  </div>

                  {log.fieldName && (
                    <div style={{ marginTop: '6px', fontSize: '0.68rem' }}>
                      <span style={{ fontWeight: 600, color: '#374151' }}>Field: </span>
                      <span style={{ color: '#6b7280' }}>{log.fieldName}</span>
                    </div>
                  )}

                  {(log.oldValue || log.newValue) && (
                    <div style={{
                      marginTop: '6px', display: 'flex', gap: '8px',
                      fontSize: '0.65rem',
                    }}>
                      {log.oldValue && (
                        <div style={{ flex: 1, background: '#fee2e2', borderRadius: '8px', padding: '4px 8px', color: '#991b1b' }}>
                          <div style={{ fontWeight: 700, marginBottom: '1px' }}>OLD</div>
                          {log.oldValue}
                        </div>
                      )}
                      {log.newValue && (
                        <div style={{ flex: 1, background: '#d1fae5', borderRadius: '8px', padding: '4px 8px', color: '#065f46' }}>
                          <div style={{ fontWeight: 700, marginBottom: '1px' }}>NEW</div>
                          {log.newValue}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AuditPage