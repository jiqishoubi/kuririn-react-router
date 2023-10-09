import React, { useEffect, useMemo } from 'react'
import Page404 from '../404'
import stack, { IPage } from '../stack'
import { IPathComponent, IKRoutesProps } from '../KRoutes'
import cloneDeep from 'lodash/cloneDeep'

const PageGetter: React.FC<{
  allPages: IKRoutesProps['pages']
  page: IPage
  page404?: IPathComponent
  isKBlock: boolean
}> = (pros) => {
  const { allPages, page, page404, isKBlock } = pros

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

  // @ts-ignore
  return <PageComponent isKBlock={isKBlock} />
}
export default PageGetter
