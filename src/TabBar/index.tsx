import { useRouter } from '@/kuririn-react-router'
import React from 'react'

const Index: React.FC = () => {
  const router = useRouter()

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        zIndex: 10,
        padding: 5,
        backgroundColor: '#b4b4b4',
      }}
    >
      <div style={{ fontSize: 17 }}>this is simple tab panel</div>
      <button
        onClick={() => {
          router.switchTab('/')
        }}
        style={{ padding: '0 10px' }}
      >
        index
      </button>
      <button
        onClick={() => {
          router.switchTab('/user')
        }}
        style={{ padding: '0 10px', marginLeft: 10 }}
      >
        user
      </button>
    </div>
  )
}
export default Index
