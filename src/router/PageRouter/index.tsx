import React, { useEffect, useState } from 'react'
import PageGetter from '../PageGetter'

const pageModules = import.meta.globEager('@/pages/**/**/index.tsx')

const PageRouter: React.FC = () => {
  const [pages, setPages] = useState<any[]>([])
  console.log('🚀 ~ pages:', pages)

  const location = window.location
  const pathname = location.pathname

  useEffect(() => {
    setPages((curPages) => {
      return [...curPages, pathname]
    })
  }, [pathname])

  return (
    <>
      {pages.map((page, index) => {
        const key = `_${index}_${page}`
        return (
          <div
            key={key}
            id={key}
            style={{
              display: index === pages.length - 1 ? 'block' : 'none',
            }}
          >
            <PageGetter pageModules={pageModules} page={page} />
          </div>
        )
      })}
    </>
  )
}
export default PageRouter
