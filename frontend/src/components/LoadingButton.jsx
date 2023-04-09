import { Spinner } from 'flowbite-react'
import React from 'react'

const LoadingButton = ({className, text, loading, onClick}) => {
  return (
    <button disabled={loading} className={className} onClick={onClick}>
      <div className="">
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