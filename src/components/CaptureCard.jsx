import { useNavigate } from 'react-router-dom'

const statusStyle = {
  APPROVED:       { background: '#d1fae5', color: '#065f46', label: 'APPROVED' },
  PENDING:        { background: '#fef3c7', color: '#92400e', label: 'PENDING' },
  QUEUED:         { background: '#fef3c7', color: '#92400e', label: 'QUEUED' },
  REJECTED:       { background: '#fee2e2', color: '#991b1b', label: 'REJECTED' },
  IN_REVIEW:      { background: '#dbeafe', color: '#1e40af', label: 'IN REVIEW' },
  PENDING_REVIEW: { background: '#dbeafe', color: '#1e40af', label: 'IN REVIEW' },
}

function CaptureCard({ capture }) {
  const navigate = useNavigate()
  const badge = statusStyle[capture.status] || statusStyle.PENDING

  return (
    <div
      onClick={() => navigate(`/review/${capture.id}`)}
      style={{
        background: '#fff',
        borderRadius: '16px',
        overflow: 'hidden',
        marginBottom: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
        cursor: 'pointer',
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      <img
        src={capture.blobUrl}
        alt={capture.documentType}
        style={{ width: '100%', height: '130px', objectFit: 'cover', display: 'block' }}
        onError={(e) => { e.target.style.display = 'none' }}
      />
      <div style={{ padding: '10px 14px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#111827' }}>
            {capture.documentType}
          </span>
          <span style={{
            fontSize: '0.6rem', fontWeight: 700, padding: '3px 9px', borderRadius: '50px',
            letterSpacing: '0.04em',
            background: badge.background,
            color: badge.color,
          }}>
            {badge.label}
          </span>
        </div>
        {capture.uploadedAt && (
          <div style={{ fontSize: '0.62rem', color: '#9ca3af', marginTop: '3px' }}>
            {new Date(capture.uploadedAt).toLocaleDateString('en-US', {
              month: 'short', day: 'numeric', year: 'numeric',
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default CaptureCard