import React, { useEffect, useMemo } from 'react'
import Page404 from '../404'
import { IPage } from '../stack'
import { IPathComponent, IKRoutesProps } from '../KRoutes'
import cloneDeep from 'lodash/cloneDeep'
import { kdata } from '../router'

const PageGetter: React.FC<{
  page: IPage
  page404?: IPathComponent
  isKBlock: boolean
}> = (pros) => {
  const { page, page404, isKBlock } = pros

  const _page404 = page404 || Page404
  const allPageItems = kdata.allPageItems || []

  const PageComponent = useMemo(() => {
    const pathname = page.pathname
    if (pathname === '/') {
      return allPageItems[0]?.component || _page404
    } else {
      let findPageItem
      for (let i = 0; i < allPageItems.length; i++) {
        const pageItem = allPageItems[i]
        if (pageItem.path === pathname) {
          findPageItem = pageItem
          break
        }
      }
      return findPageItem?.component || _page404
    }
  }, [page])

  // @ts-ignore
  return <PageComponent isKBlock={isKBlock} />
}
export default PageGetter
