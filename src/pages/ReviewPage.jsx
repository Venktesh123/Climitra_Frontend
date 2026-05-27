import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../api/axios'
import Loader from '../components/Loader'

function ReviewPage() {
  const { captureId } = useParams()
  const navigate = useNavigate()

  const [capture, setCapture] = useState(null)
  const [fields, setFields] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)

  const getCaptureDetails = async () => {
    try {
      // FIXED: backend route is GET /review/:captureId (getReviewById in review.service.js)
      const response = await API.get(`/review/${captureId}`)
      const data = response.data.data
      console.log('Capture Details:', data);
      setCapture(data)
      // Backend returns extractedFields (Prisma include key)
      setFields(
        (data.extractedFields || []).map((f) => ({
          ...f,
          currentValue: f.value,
        }))
      )
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { getCaptureDetails() }, [])

  const handleFieldChange = (index, value) => {
    const updated = [...fields]
    updated[index].currentValue = value
    setFields(updated)
  }

  const updateField = async (fieldId, currentValue) => {
    try {
      await API.put(`/review/field/${fieldId}`, { currentValue })
      alert('Field Updated')
    } catch (error) {
      console.log(error)
      alert('Update Failed')
    }
  }

  const approveCapture = async () => {
    try {
      setActionLoading(true)
      await API.post(`/review/approve/${captureId}`)
      alert('Capture Approved')
      navigate('/dashboard')
    } catch (error) {
      console.log(error)
      alert('Approval Failed')
    } finally {
      setActionLoading(false)
    }
  }

  const rejectCapture = async () => {
    try {
      setActionLoading(true)
      await API.post(`/review/reject/${captureId}`)
      alert('Capture Rejected')
      navigate('/dashboard')
    } catch (error) {
      console.log(error)
      alert('Rejection Failed')
    } finally {
      setActionLoading(false)
    }
  }

  if (loading) return <Loader message="Loading Review..." />

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
        .rv-field-input {
          width: 100%; padding: 10px 12px; border-radius: 10px;
          border: 1.5px solid #d1d5db; background: #fff;
          font-family: 'Montserrat', sans-serif; font-size: 0.82rem; color: #111827;
          outline: none; transition: border-color 0.2s;
        }
        .rv-field-input:focus { border-color: #16a34a; }
        .rv-update-btn {
          padding: 7px 16px; border-radius: 20px; border: none; cursor: pointer;
          background: #111827; color: #fff;
          font-family: 'Montserrat', sans-serif; font-size: 0.65rem; font-weight: 700;
          letter-spacing: 0.06em; transition: opacity 0.18s;
        }
        .rv-update-btn:hover { opacity: 0.85; }
      `}</style>

      {/* HEADER */}
      <div style={{
        background: 'linear-gradient(135deg, #166534 0%, #16a34a 60%, #22c55e 100%)',
        padding: '1.5rem 1.25rem 3.2rem', position: 'relative',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
          <button onClick={() => navigate('/dashboard')} style={{
            background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%',
            width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#fff', fontSize: '18px',
          }}>‹</button>
          <span style={{ fontWeight: 800, fontSize: '1.05rem', color: '#fff', letterSpacing: '0.06em' }}>
            CLIMITRA
          </span>
        </div>
        <div style={{ color: '#fff', fontSize: '1.15rem', fontWeight: 700 }}>OCR Review</div>
        <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.72rem', marginTop: '3px', fontWeight: 500 }}>
          {capture?.documentType}
        </div>
        <svg style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'block' }}
          viewBox="0 0 375 40" preserveAspectRatio="none">
          <path d="M0 20 Q90 0 187 20 Q280 40 375 15 L375 40 L0 40 Z" fill="#f1f5f4"/>
        </svg>
      </div>

      <div style={{ padding: '0 1.25rem 2rem', marginTop: '-1rem', position: 'relative', zIndex: 2 }}>

        {/* DOCUMENT IMAGE */}
        {capture?.blobUrl && (
          <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', marginBottom: '1rem', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
            {/* FIXED: blobUrl is already the full Vercel Blob URL, no localhost prefix needed */}
            <img
              src={capture.blobUrl}
              alt="capture"
              style={{ width: '100%', maxHeight: '220px', objectFit: 'cover', display: 'block' }}
            />
          </div>
        )}

        {/* EXTRACTED FIELDS */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '1rem 1.25rem', marginBottom: '1rem', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>
            Extracted Fields
          </div>

          {fields.length === 0 && (
            <div style={{ fontSize: '0.75rem', color: '#9ca3af', textAlign: 'center', padding: '1rem 0' }}>
              No extracted fields yet. OCR may still be processing.
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {fields.map((field, index) => (
              <div
                key={field.id}
                style={{
                  padding: '12px',
                  borderRadius: '12px',
                  background: field.confidenceScore < 70 ? '#fffbeb' : '#f0fdf4',
                  border: `1.5px solid ${field.confidenceScore < 70 ? '#fde68a' : '#bbf7d0'}`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#374151' }}>
                    {field.fieldName}
                  </span>
                  {field.confidenceScore != null && (
                    <span style={{
                      fontSize: '0.6rem', fontWeight: 700,
                      color: field.confidenceScore < 70 ? '#92400e' : '#065f46',
                    }}>
                      {field.confidenceScore}% confidence
                    </span>
                  )}
                </div>
                <input
                  className="rv-field-input"
                  type="text"
                  value={field.currentValue}
                  onChange={(e) => handleFieldChange(index, e.target.value)}
                  style={{ marginBottom: '8px' }}
                />
                <button
                  className="rv-update-btn"
                  onClick={() => updateField(field.id, field.currentValue)}
                >
                  UPDATE FIELD
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* AUDIT LINK */}
        <button
          onClick={() => navigate(`/audit/${captureId}`)}
          style={{
            width: '100%', padding: '11px', borderRadius: '12px',
            border: '1.5px solid #e5e7eb', background: '#fff',
            color: '#374151', fontFamily: "'Montserrat', sans-serif",
            fontWeight: 600, fontSize: '0.72rem', cursor: 'pointer',
            marginBottom: '1rem', letterSpacing: '0.04em',
          }}
        >
          ☰ VIEW AUDIT TRAIL
        </button>

        {/* APPROVE / REJECT */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={approveCapture}
            disabled={actionLoading}
            style={{
              flex: 1, padding: '13px', borderRadius: '50px', border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg, #166534 0%, #16a34a 55%, #22c55e 100%)',
              color: '#fff', fontFamily: "'Montserrat', sans-serif", fontWeight: 700,
              fontSize: '0.78rem', letterSpacing: '0.08em',
              boxShadow: '0 4px 14px rgba(22,163,74,0.32)',
              opacity: actionLoading ? 0.6 : 1,
            }}
          >
            ✓ APPROVE
          </button>
          <button
            onClick={rejectCapture}
            disabled={actionLoading}
            style={{
              flex: 1, padding: '13px', borderRadius: '50px', border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg, #991b1b 0%, #ef4444 100%)',
              color: '#fff', fontFamily: "'Montserrat', sans-serif", fontWeight: 700,
              fontSize: '0.78rem', letterSpacing: '0.08em',
              boxShadow: '0 4px 14px rgba(239,68,68,0.28)',
              opacity: actionLoading ? 0.6 : 1,
            }}
          >
            ✕ REJECT
          </button>
        </div>

      </div>
    </div>
  )
}

export default ReviewPage