import { useRouter } from '@/kuririn-react-router'
import React from 'react'

const Index: React.FC = () => {
  const router = useRouter()
  return (
    <>
      <h2>User Sub Page</h2>

      <button
        onClick={() => {
          router.back()
        }}
      >
        go back
      </button>
    </>
  )
}
export default Index
