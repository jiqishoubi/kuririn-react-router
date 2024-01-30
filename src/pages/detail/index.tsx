import React from 'react'
import { useRouter } from '@/kuririn-react-router'

const Index: React.FC = () => {
  const router = useRouter()
  return (
    <>
      <h2 style={{ marginBottom: 10 }}>Detail Page</h2>

      <div style={{ marginBottom: 10 }}>
        <button
          onClick={() => {
            router.push('/subDetail')
          }}
        >
          go subDetail
        </button>
      </div>

      <div style={{ marginBottom: 10 }}>
        <button
          onClick={() => {
            router.replace('/subDetail')
          }}
        >
          replace subDetail
        </button>
      </div>

      <div style={{ marginBottom: 10 }}>
        <button
          onClick={() => {
            router.back()
          }}
        >
          go back
        </button>
      </div>

      <div style={{ marginBottom: 10 }}>
        <button
          onClick={() => {
            router.switchTab('/')
          }}
        >
          switchTab index
        </button>
      </div>

      <div style={{ marginBottom: 10 }}>
        <button
          onClick={() => {
            router.switchTab('/user')
          }}
        >
          switchTab user
        </button>
      </div>
    </>
  )
}
export default Index
