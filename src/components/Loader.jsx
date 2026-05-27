function Loader({ message = 'Loading...' }) {
  return (
    <div style={{
      minHeight: '100svh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f1f5f4',
      fontFamily: "'Montserrat', sans-serif",
      gap: '16px',
    }}>
      <div style={{
        width: '44px',
        height: '44px',
        border: '4px solid #bbf7d0',
        borderTop: '4px solid #16a34a',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <p style={{ fontSize: '0.82rem', fontWeight: 600, color: '#6b7280' }}>{message}</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

export default Loader