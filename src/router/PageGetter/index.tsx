import React, { useMemo } from 'react'
import routes from '@/routes'
import Page404 from '@/router/404'

const PageGetter: React.FC<{
  pageModules: any
  page: string
}> = (pros) => {
  const { pageModules, page } = pros
  const PageComponent = useMemo(() => {
    if (page === '/') {
      const pageModulesKey = '/src' + routes[0] + '.tsx'
      return pageModules[pageModulesKey]?.default
    } else if (routes.some((route) => route === page)) {
      const pageModulesKey = '/src' + page + '.tsx'
      return pageModules[pageModulesKey]?.default || Page404
    } else {
      return Page404
    }
  }, [pageModules, page])
  return <PageComponent />
}
export default PageGetter
