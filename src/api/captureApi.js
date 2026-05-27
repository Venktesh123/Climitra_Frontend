import API from './axios'

export const uploadCaptureApi = async (formData) => {

  return await API.post(
    '/captures/upload',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
}

export const getCapturesApi = async () => {
  return await API.get('/captures')
}