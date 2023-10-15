import React, { useEffect, useState } from 'react'
import { onPageShow, onPageHide, useRouter } from '@/kuririn-react-router'

const Index: React.FC = (props) => {
  // console.log("🚀 ~ index page props:", props)
  const router = useRouter()
  const [inputValue, setInputValue] = useState<string>('')
  const [list, setList] = useState<any[]>([])

  useEffect(() => {
    console.log('index load')
    setList(new Array(100).fill(0))
    return () => {
      console.log('index unload')
    }
  }, [])

  onPageShow(props, () => {
    console.log('🚀 ~ ', 'index page show')
  })

  onPageHide(props, () => {
    console.log('🚀 ~ ', 'index page hide')
  })

  return (
    <>
      <h2 style={{ marginBottom: 10 }}>Index page</h2>

      <div style={{ marginBottom: 10 }}>
        <div
          style={{
            display: 'flex',
          }}
        >
          <label>Input: </label>
          <input
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value)
            }}
            style={{
              height: 25,
            }}
          />
        </div>
      </div>

      <div style={{ marginBottom: 10 }}>
        <button
          onClick={() => {
            router.push('/detail1')
          }}
        >
          push detail1 page
        </button>
      </div>

      <div className="list">
        <div>mock list: </div>
        <ol>
          {list.map((_, index) => (
            <li
              key={index}
              style={{
                margin: '3px 0',
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
