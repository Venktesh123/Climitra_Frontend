import API from './axios'

export const uploadCaptureApi = (formData) =>
  API.post('/captures/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

export const getCapturesApi = () => API.get('/captures')