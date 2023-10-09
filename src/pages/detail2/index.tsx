import React from 'react'
import { router } from '@/kuririn-react-router'

const Index: React.FC = () => {
  return (
    <>
      detail2
      <button
        onClick={() => {
          router.back()
        }}
      >
        back
      </button>
    </>
  )
}
export default Index
