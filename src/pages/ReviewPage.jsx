import { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import API from '../api/axios'

function ReviewPage() {

  const { captureId } = useParams()

  const [capture, setCapture] = useState(null)

  const [fields, setFields] = useState([])

  const [loading, setLoading] = useState(true)

  const getCaptureDetails = async () => {

    try {

      const response = await API.get(
        `/captures/${captureId}`
      )

      setCapture(response.data.data)

      setFields(response.data.data.fields)

      setLoading(false)

    } catch (error) {

      console.log(error)

      setLoading(false)

    }
  }

  useEffect(() => {

    getCaptureDetails()

  }, [])

  const handleFieldChange = (
    index,
    value
  ) => {

    const updatedFields = [...fields]

    updatedFields[index].currentValue = value

    setFields(updatedFields)
  }

  const updateField = async (
    fieldId,
    currentValue
  ) => {

    try {

      await API.put(
        `/review/field/${fieldId}`,
        {
          currentValue
        }
      )

      alert('Field Updated')

    } catch (error) {

      console.log(error)

    }
  }

  const approveCapture = async () => {

    try {

      await API.post(
        `/review/approve/${captureId}`
      )

      alert('Capture Approved')

    } catch (error) {

      console.log(error)

    }
  }

  const rejectCapture = async () => {

    try {

      await API.post(
        `/review/reject/${captureId}`
      )

      alert('Capture Rejected')

    } catch (error) {

      console.log(error)

    }
  }

  if (loading) {

    return (

      <div className='p-10 text-2xl font-bold'>

        Loading Review Page...

      </div>
    )
  }

  return (

    <div className='p-10'>

      <h1 className='text-4xl font-bold mb-10'>

        OCR Review Dashboard

      </h1>

      <div className='grid grid-cols-2 gap-10'>

        {/* LEFT SIDE IMAGE */}

        <div>

          <img
            src={`http://localhost:5000/${capture.blobUrl}`}
            alt='capture'
            className='w-full rounded-lg border'
          />

        </div>

        {/* RIGHT SIDE OCR FIELDS */}

        <div>

          <h2 className='text-2xl font-bold mb-5'>

            Extracted Fields

          </h2>

          <div className='space-y-5'>

            {
              fields.map((field, index) => (

                <div
                  key={field.id}
                  className={`border p-5 rounded-lg ${
                    field.confidenceScore < 70
                      ? 'bg-yellow-100'
                      : 'bg-green-100'
                  }`}
                >

                  <div className='flex justify-between mb-3'>

                    <h3 className='font-bold'>

                      {field.fieldName}

                    </h3>

                    <p>

                      Confidence:

                      {' '}

                      {field.confidenceScore}%

                    </p>

                  </div>

                  <input
                    type='text'
                    value={field.currentValue}
                    onChange={(e) =>
                      handleFieldChange(
                        index,
                        e.target.value
                      )
                    }
                    className='border p-2 w-full mb-3'
                  />

                  <button
                    onClick={() =>
                      updateField(
                        field.id,
                        field.currentValue
                      )
                    }
                    className='bg-black text-white px-5 py-2 rounded'
                  >

                    Update Field

                  </button>

                </div>
              ))
            }

          </div>

          {/* ACTION BUTTONS */}

          <div className='flex gap-5 mt-10'>

            <button
              onClick={approveCapture}
              className='bg-green-600 text-white px-6 py-3 rounded-lg'
            >

              Approve Capture

            </button>

            <button
              onClick={rejectCapture}
              className='bg-red-600 text-white px-6 py-3 rounded-lg'
            >

              Reject Capture

            </button>

          </div>

        </div>

      </div>

    </div>
  )
}

export default ReviewPage