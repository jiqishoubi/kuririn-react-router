import React, { useEffect, useMemo } from 'react'
import Page404 from '../404'
import { IPage } from '../stack'
import { IKRoutesProps } from '../KRoutes'

const PageGetter: React.FC<{
  allPages: IKRoutesProps['pages']
  page: IPage
  page404?: React.FC
}> = (pros) => {
  const { allPages, page, page404 } = pros

  const _page404 = page404 || Page404

  const PageComponent = useMemo(() => {
    const pathname = page.pathname
    if (pathname === '/') {
      return allPages[0]?.component || _page404
    } else {
      let findPageItem
      for (let i = 0; i < allPages.length; i++) {
        const pageItem = allPages[i]
        if (pageItem.path === pathname) {
          findPageItem = pageItem
          break
        }
      }
      return findPageItem?.component || _page404
    }
  }, [allPages, page])

  return <PageComponent />
}
export default PageGetter
