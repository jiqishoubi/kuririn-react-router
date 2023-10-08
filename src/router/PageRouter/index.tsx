import React, { useEffect, useState } from 'react'
import PageGetter from '../PageGetter'
import history from '../history'

const pageModules = import.meta.globEager('@/pages/**/**/index.tsx')

const PageRouter: React.FC = () => {
  const [pages, setPages] = useState<any[]>([])

  useEffect(() => {
    const pathname = history.location.pathname
    handlePathname(pathname, 'PUSH')
    const unlisten = history.listen(({ location, action }) => {
      handlePathname(location.pathname, action as any)
    })
    return unlisten
  }, [])

  function handlePathname(pathname: string, action: 'PUSH' | 'POP') {
    console.log('🚀 ~ action:', action)
    if (action === 'PUSH') {
      setPages((curPages) => [...curPages, pathname])
    } else {
      setPages((curPages) => curPages.slice(0, curPages.length - 1))
    }
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
