import React from 'react'
import { useRouter } from '@/kuririn-react-router'

const _fakeListData = new Array(100).fill(0).map((_, index) => index)

const Index: React.FC = () => {
  const router = useRouter()
  return (
    <>
      <h2 style={{ marginBottom: 10 }}>Detail Page</h2>

      <div
        style={{
          position: 'fixed',
          right: 0,
          top: 50,
          backgroundColor: '#ddd',
        }}
      >
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
      </div>

      <div className="list">
        <div>mock list: </div>
        <ol>
          {_fakeListData.map((_, index) => (
            <li
              key={index}
              style={{
                margin: '3px 0',
                padding: 10,
                borderBottom: '1px solid #eee',
              }}
            >
              {index}
            </li>
          ))}
        </ol>
      </div>
    </>
  )
}
export default Index
