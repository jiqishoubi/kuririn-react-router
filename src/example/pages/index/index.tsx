import React, { useEffect, useState } from 'react'
import { onPageShow, onPageHide, useRouter, UNSAFE_browserHistory, useCurrentPages } from '@/kuririn-react-router'

const _fakeListData = new Array(100).fill(0).map((_, index) => index)

const Index: React.FC = (props) => {
  // console.log("🚀 ~ index page props:", props)
  const router = useRouter()
  const [inputValue, setInputValue] = useState<string>('')
  const [list, setList] = useState<number[]>([])

  const pages = useCurrentPages() // 获取当前页面栈
  // console.log(`🚀 ~ pages:`, pages)

  useEffect(() => {
    console.log('🚀 ~ index load')
    setList(_fakeListData)
    return () => {
      console.log('🚀 ~ index unload')
    }
  }, [])

  onPageShow(props, () => {
    console.log('🚀 ~ index page show')
  })

  onPageHide(props, () => {
    console.log('🚀 ~ index page hide')
  })

  return (
    <>
      <h2 style={{ marginBottom: 10 }}>Index Tab Page</h2>

      <div style={{ marginBottom: 10 }}>
        <div
          style={{
            display: 'flex',
          }}
        >
          <label>input: &nbsp;</label>
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

      <button
        onClick={() => {
          router.push('/detail')
        }}
        style={{
          position: 'fixed',
          right: 0,
          top: 100,
          padding: '10px 20px',
        }}
      >
        go detail
      </button>

      <div className="list">
        <div>mock list: </div>
        <ol>
          {list.map((_, index) => (
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
