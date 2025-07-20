import { LoaderIcon } from 'lucide-react'
import React from 'react'
import { useTheamStore } from '../stateStore/zustantTheamStore'

const Pageloder = () => {
  const {theam}=useTheamStore()
  return (
    <div className=' min-h-screen flex items-center justify-center' data-theme={theam}>
      {/* Loader Icon */}
      <LoaderIcon className=' animate-spin size-20 text-primary '/>
    </div>
  )
}

export default Pageloder 