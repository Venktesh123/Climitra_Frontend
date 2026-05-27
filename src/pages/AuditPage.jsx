import { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import API from '../api/axios'

function AuditPage() {

  const { captureId } = useParams()

  const [logs, setLogs] = useState([])

  const [loading, setLoading] = useState(true)

  const getAuditLogs = async () => {

    try {

      const response = await API.get(
        `/audit/${captureId}`
      )

      setLogs(response.data.data)

      setLoading(false)

    } catch (error) {

      console.log(error)

      setLoading(false)

    }
  }

  useEffect(() => {

    getAuditLogs()

  }, [])

  if (loading) {

    return (

      <div className='p-10 text-2xl font-bold'>

        Loading Audit Logs...

      </div>
    )
  }

  return (

    <div className='p-10'>

      <h1 className='text-4xl font-bold mb-10'>

        Audit Timeline

      </h1>

      <div className='space-y-5'>

        {
          logs.map((log) => (

            <div
              key={log.id}
              className='border rounded-lg p-5 shadow-sm'
            >

              <div className='flex justify-between mb-3'>

                <h2 className='font-bold text-xl'>

                  {log.eventType}

                </h2>

                <p className='text-sm text-gray-500'>

                  {
                    new Date(
                      log.createdAt
                    ).toLocaleString()
                  }

                </p>

              </div>

              <div className='space-y-2'>

                <p>

                  <span className='font-semibold'>
                    Actor Type:
                  </span>

                  {' '}

                  {log.actorType}

                </p>

                <p>

                  <span className='font-semibold'>
                    Actor ID:
                  </span>

                  {' '}

                  {log.actorId}

                </p>

                {
                  log.fieldName && (

                    <p>

                      <span className='font-semibold'>
                        Field:
                      </span>

                      {' '}

                      {log.fieldName}

                    </p>
                  )
                }

                {
                  log.oldValue && (

                    <p>

                      <span className='font-semibold'>
                        Old Value:
                      </span>

                      {' '}

                      {log.oldValue}

                    </p>
                  )
                }

                {
                  log.newValue && (

                    <p>

                      <span className='font-semibold'>
                        New Value:
                      </span>

                      {' '}

                      {log.newValue}

                    </p>
                  )
                }

              </div>

            </div>
          ))
        }

      </div>

    </div>
  )
}

export default AuditPage