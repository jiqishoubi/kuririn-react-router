import React, { useEffect, useState } from 'react'
import PageGetter from '../PageGetter'
import { useLocation } from 'react-router-dom'

const pageModules = import.meta.globEager('@/pages/**/**/index.tsx')

const PageRouter: React.FC = () => {
  const [pages, setPages] = useState<any[]>([])

  const location = useLocation()
  const pathname = location.pathname
  console.log('🚀 ~ location:', location)

  useEffect(() => {
    handlePathname(pathname)
  }, [pathname])

  function handlePathname(pathname: string) {
    setPages((curPages) => {
      return [...curPages, pathname]
    })
  }

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
