import React from 'react'
import { useRouter } from '@/kuririn-react-router'

const Index: React.FC = () => {
  const router = useRouter()
  return (
    <>
      <h2 style={{ marginBottom: 10 }}>detail2 page</h2>

      <div style={{ marginBottom: 10 }}>
        <button
          onClick={() => {
            router.back()
          }}
        >
          go back
        </button>
      </div>
    </>
  )
}
export default Index
