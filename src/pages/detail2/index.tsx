import React from 'react'
import { useNavigate } from 'react-router-dom'
import history from '@/router/history'

const Index: React.FC = () => {
  return (
    <>
      detail2
      <button
        onClick={() => {
          history.back()
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
