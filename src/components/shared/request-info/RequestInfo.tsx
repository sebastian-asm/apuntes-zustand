import { useEffect, useState } from 'react'

import tesloApi from '../../../api/teslo.api'

export const RequestInfo = () => {
  const [info, setInfo] = useState<unknown>()

  useEffect(() => {
    tesloApi
      .get('/auth/private')
      .then(({ data }) => setInfo(data))
      .catch(() => setInfo('Error'))
  }, [])

  return (
    <div>
      <p>Información</p>
      <pre className="text-xs">{JSON.stringify(info, null, 2)}</pre>
    </div>
  )
}
