import React, { useMemo } from 'react'
import routes from '@/routes'
import Page404 from '../404'
import { IPage } from '../stack'
import { IKRoutesProps } from '../KRoutes'

const PageGetter: React.FC<{
  allPages: IKRoutesProps['pages']
  page: IPage
  page404?: React.FC
}> = (pros) => {
  const { allPages, page, page404 } = pros

  const PageComponent = useMemo(() => {
    const pathname = page.pathname
    console.log('🚀 ~ pathname:', pathname)
    if (pathname === '/') {
      return allPages[0]?.component || Page404
    } else if (routes.some((route) => route === pathname)) {
      // const pageModulesKey = '/src' + pathname + '.tsx'
      // return pageModules[pageModulesKey]?.default || Page404
    } else {
      return Page404
    }
    return Page404
  }, [allPages, page])

  return <PageComponent />
}
export default PageGetter
