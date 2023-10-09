import React, { useEffect, useState } from 'react'
import { router } from '@/kuririn-react-router'

const Index: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [list, setList] = useState<any[]>([])

  useEffect(() => {
    console.log('index load')
    setList(new Array(100).fill(0))
    return () => {
      console.log('index unload')
    }
  }, [])

  return (
    <>
      <div>
        <input
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value)
          }}
        />
      </div>
      index
      <div
        style={{
          height: 100,
          backgroundColor: 'red',
        }}
      >
        box
      </div>
      <div className="list">
        {list.map((_, index) => (
          <div
            key={index}
            className="item"
            style={{
              height: 30,
              backgroundColor: 'green',
              margin: 5,
            }}
          >
            {index}
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          router.push('/detail1')
        }}
        style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          width: 100,
          height: 100,
        }}
      >
        go detail1
      </button>
    </>
  )
}
export default Index
