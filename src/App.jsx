import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import UploadCapture from './pages/UploadCapture'
import ReviewPage from './pages/ReviewPage'
import AuditPage from './pages/AuditPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Login />} />

        <Route path='/register' element={<Register />} />

        <Route path='/dashboard' element={<Dashboard />} />

        <Route path='/upload' element={<UploadCapture />} />

        <Route path='/review/:captureId' element={<ReviewPage />} />

        <Route path='/audit/:captureId' element={<AuditPage />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App