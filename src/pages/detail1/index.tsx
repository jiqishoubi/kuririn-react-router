import React from 'react'
import router from '@/router'

const Index: React.FC = () => {
  return (
    <>
      detail1
      <div>
        <button
          onClick={() => {
            router.push('/pages/detail2/index')
          }}
        >
          go detail2
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            router.back()
          }}
        >
          back
        </button>
      </div>
      <div
        style={{
          height: 8000,
          backgroundColor: 'ActiveBorder',
        }}
      >
        height
      </div>
    </>
  )
}
export default Index
