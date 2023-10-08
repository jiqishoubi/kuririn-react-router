import React, { useMemo } from 'react'
import routes from '@/routes'
import Page404 from '../404'
import { IPage } from '../stack'

const PageGetter: React.FC<{
  pageModules: any
  page: IPage
}> = (pros) => {
  const { pageModules, page } = pros
  const PageComponent = useMemo(() => {
    const pathname = page.pathname
    if (pathname === '/') {
      const pageModulesKey = '/src' + routes[0] + '.tsx'
      return pageModules[pageModulesKey]?.default
    } else if (routes.some((route) => route === pathname)) {
      const pageModulesKey = '/src' + page + '.tsx'
      return pageModules[pageModulesKey]?.default || Page404
    } else {
      return Page404
    }
  }, [pageModules, page])
  return <PageComponent />
}
export default PageGetter
