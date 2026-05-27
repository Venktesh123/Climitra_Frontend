import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import UploadCapture from './pages/UploadCapture'
import ReviewPage from './pages/ReviewPage'
import AuditPage from './pages/AuditPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED */}
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path="/upload" element={
          <ProtectedRoute><UploadCapture /></ProtectedRoute>
        } />
        <Route path="/review/:captureId" element={
          <ProtectedRoute><ReviewPage /></ProtectedRoute>
        } />
        <Route path="/audit/:captureId" element={
          <ProtectedRoute><AuditPage /></ProtectedRoute>
        } />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App