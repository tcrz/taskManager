import { Spinner } from 'flowbite-react'
import React from 'react'

const LoadingButton = ({className, text, loading}) => {
  return (
    <button disabled={loading} className={className}>
      <div className="mr-3">
        {loading && <Spinner
          size="sm"
          light={true}
        />}
      </div>
      {!loading && text}
    </button>
  )
}

export default LoadingButton