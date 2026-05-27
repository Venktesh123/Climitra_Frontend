import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { uploadCaptureApi } from '../api/captureApi'

const DOC_TYPES = [
  { value: 'WEIGHBRIDGE',      label: 'Weighbridge',      icon: '⚖️' },
  { value: 'MOISTURE_METER',   label: 'Moisture Meter',   icon: '💧' },
  { value: 'DISPATCH_CHALLAN', label: 'Dispatch Challan', icon: '🧾' },
]

function UploadCapture() {
  const navigate = useNavigate()
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [documentType, setDocumentType] = useState('WEIGHBRIDGE')
  const [loading, setLoading] = useState(false)

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {

  e.preventDefault()

  if (!image) {
    return alert('Please select an image')
  }

  try {

    setLoading(true)

    const formData = new FormData()

    formData.append('image', image)

    formData.append(
      'documentType',
      documentType
    )

    // uploadedById REMOVED
    // backend takes user from JWT token

    const response =
      await uploadCaptureApi(formData)

    console.log(response)

    alert('Capture Uploaded Successfully')

    navigate('/dashboard')

  } catch (error) {

    console.log(error)

    alert('Upload Failed')

  } finally {

    setLoading(false)

  }
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
        .up-drop {
          border: 2px dashed #bbf7d0; background: #fff; border-radius: 16px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 2rem 1rem; cursor: pointer; transition: border-color 0.2s, background 0.2s;
        }
        .up-drop.has-file { border-color: #16a34a; background: #f0fdf4; }
        .up-doc-btn {
          padding: 10px 8px; border-radius: 12px; border: 1.5px solid #e5e7eb;
          background: #fff; cursor: pointer; text-align: center;
          font-family: 'Montserrat', sans-serif; font-size: 0.62rem; font-weight: 700;
          color: #6b7280; transition: all 0.18s; line-height: 1.4;
        }
        .up-doc-btn.active { border-color: #16a34a; background: #f0fdf4; color: #166534; }
        .up-submit {
          width: 100%; padding: 14px; border-radius: 50px; border: none; cursor: pointer;
          background: linear-gradient(135deg, #166534 0%, #16a34a 55%, #22c55e 100%);
          color: #fff; font-family: 'Montserrat', sans-serif; font-weight: 700;
          font-size: 0.88rem; letter-spacing: 0.1em;
          box-shadow: 0 4px 14px rgba(22,163,74,0.35); transition: transform 0.18s;
        }
        .up-submit:hover { transform: translateY(-1px); }
        .up-submit:active { transform: scale(0.98); }
        .up-submit:disabled { opacity: 0.6; cursor: not-allowed; }
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
            cursor: 'pointer', color: '#fff', fontSize: '18px', flexShrink: 0,
          }}>‹</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <svg width="24" height="24" viewBox="0 0 38 38" fill="none">
              <path d="M10 28 Q10 10 28 10 Q28 20 20 24 L28 10" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinejoin="round"/>
              <path d="M10 28 Q12 18 20 24" stroke="#fff" strokeWidth="2.2" fill="none"/>
              <rect x="14" y="20" width="2.5" height="5" rx="0.8" fill="rgba(255,255,255,0.8)"/>
              <rect x="17.5" y="17" width="2.5" height="8" rx="0.8" fill="#fff"/>
              <rect x="21" y="19" width="2.5" height="6" rx="0.8" fill="rgba(255,255,255,0.8)"/>
              <polyline points="14,20 18.5,16 23.5,18.5" stroke="#bfdbfe" strokeWidth="1.8" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
              <circle cx="23.5" cy="18.5" r="1.2" fill="#bfdbfe"/>
            </svg>
            <span style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '0.06em', color: '#fff' }}>CLIMITRA</span>
          </div>
        </div>
        <div style={{ color: '#fff', fontSize: '1.15rem', fontWeight: 700 }}>Upload Capture</div>
        <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.72rem', fontWeight: 500, marginTop: '3px' }}>Add a new document capture</div>
        <svg style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'block' }}
          viewBox="0 0 375 40" preserveAspectRatio="none">
          <path d="M0 20 Q90 0 187 20 Q280 40 375 15 L375 40 L0 40 Z" fill="#f1f5f4"/>
        </svg>
      </div>

      {/* BODY */}
      <form onSubmit={handleSubmit} style={{ padding: '0 1.25rem 2rem', marginTop: '-1rem', position: 'relative', zIndex: 2 }}>

        {/* IMAGE UPLOAD */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '1rem 1.25rem', marginBottom: '1rem', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '8px' }}>
            Document Image
          </label>
          <div
            className={`up-drop${preview ? ' has-file' : ''}`}
            onClick={() => document.getElementById('fileInput').click()}
          >
            {preview ? (
              <>
                <img src={preview} alt="Preview" style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', borderRadius: '10px', display: 'block' }} />
                <div style={{ fontSize: '0.68rem', color: '#16a34a', fontWeight: 600, marginTop: '8px' }}>
                  {image?.name}
                </div>
              </>
            ) : (
              <>
                <div style={{ fontSize: '2.2rem', marginBottom: '0.75rem' }}>☁</div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>Tap to upload image</div>
                <div style={{ fontSize: '0.68rem', color: '#6b7280', textAlign: 'center' }}>
                  or <span style={{ color: '#16a34a', fontWeight: 700, textDecoration: 'underline' }}>browse files</span><br/>JPG, PNG supported
                </div>
              </>
            )}
          </div>
          <input id="fileInput" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
        </div>

        {/* DOCUMENT TYPE */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '1rem 1.25rem', marginBottom: '1rem', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '8px' }}>
            Document Type
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: '8px' }}>
            {DOC_TYPES.map(({ value, label, icon }) => (
              <button
                key={value}
                type="button"
                className={`up-doc-btn${documentType === value ? ' active' : ''}`}
                onClick={() => setDocumentType(value)}
              >
                <span style={{ fontSize: '18px', display: 'block', marginBottom: '4px' }}>{icon}</span>
                {label}
              </button>
            ))}
          </div>
        </div>

        <button className="up-submit" type="submit" disabled={loading}>
          {loading ? 'UPLOADING...' : 'UPLOAD CAPTURE'}
        </button>

      </form>
    </div>
  )
}

export default UploadCapture