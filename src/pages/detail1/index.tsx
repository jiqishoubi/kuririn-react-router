import React from 'react'
import { router } from '@/kuririn-react-router'

const Index: React.FC = () => {
  return (
    <>
      <h2 style={{ marginBottom: 10 }}>detail1 page</h2>

      <div style={{ marginBottom: 10 }}>
        <button
          onClick={() => {
            router.push('/detail2')
          }}
        >
          push detail2 page
        </button>
      </div>

      <div style={{ marginBottom: 10 }}>
        <button
          onClick={() => {
            router.replace('/detail2')
          }}
        >
          replace detail2 page
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
    </>
  )
}
export default Index
