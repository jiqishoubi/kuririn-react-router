import React from 'react'
import router from '@/router'

const Index: React.FC = () => {
  return (
    <>
      detail1
      <button
        onClick={() => {
          router.push('/pages/detail2/index')
        }}
      >
        go detail2
      </button>
      <button
        onClick={() => {
          router.back()
        }}
      >
        back
      </button>
      <div
        style={{
          height: 8000,
        }}
      >
        height
      </div>
    </>
  )
}
export default Index
