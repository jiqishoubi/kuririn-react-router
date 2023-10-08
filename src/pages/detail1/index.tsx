import React from 'react'

const Index: React.FC = () => {
  return (
    <>
      detail1
      <button
        onClick={() => {
          // history.push('/pages/detail2/index')
        }}
      >
        go detail2
      </button>
      <button
        onClick={() => {
          history.back()
        }}
      >
        back
      </button>
      <div
        style={{
          height: 8000,
        }}
      >
        height
      </div>
    </>
  )
}
export default Index
