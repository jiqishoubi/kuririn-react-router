import router from '@/router'
import React from 'react'

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
