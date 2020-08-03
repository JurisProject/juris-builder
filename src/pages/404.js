import React from 'react'
import { Spinner } from 'reactstrap'

export default () => {
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    setReady(true)
  }, [])

  return ( ready ?
    <div>
      <h1>404 - Oh no's! We couldn't find that page :(</h1>
    </div> : <Spinner />
  )
}
