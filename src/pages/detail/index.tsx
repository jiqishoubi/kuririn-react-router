import React from 'react'
import { useNavigate } from 'react-router-dom'

const Index: React.FC = () => {
  const navigate = useNavigate()
  return (
    <>
      detail
      <button
        onClick={() => {
          navigate(-1)
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
