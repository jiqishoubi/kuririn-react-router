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
    </>
  )
}
export default Index
