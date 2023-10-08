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
    </>
  )
}
export default Index
