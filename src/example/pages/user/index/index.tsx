import { useRouter } from '@/kuririn-react-router'
import React from 'react'

const Index: React.FC = () => {
  const router = useRouter()
  return (
    <>
      <h2 style={{ marginBottom: 10 }}>User Tab Page</h2>

      <div>this is user page, is a tab page</div>

      <button
        onClick={() => {
          router.push('/userSub')
        }}
      >
        go user subPage
      </button>
    </>
  )
}
export default Index
