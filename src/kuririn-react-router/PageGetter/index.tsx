import React, { useEffect, useMemo } from 'react'
import { IPage } from '../stack'
import { IPageItemComponent, IKRoutesProps } from '../KRoutes'
// import cloneDeep from 'lodash/cloneDeep'
import { kdata } from '../router'

const PageGetter: React.FC<{
  page: IPage
  isKBlock: boolean
  page404: IPageItemComponent
}> = (pros) => {
  const { page, page404, isKBlock } = pros

  const allPageItems = kdata.allPageItems || []

  const PageComponent = useMemo(() => {
    const pathname = page.pathname
    if (pathname === '/') {
      return allPageItems[0]?.component || page404
    } else {
      let findPageItem
      for (let i = 0; i < allPageItems.length; i++) {
        const pageItem = allPageItems[i]
        if (pageItem.path === pathname) {
          findPageItem = pageItem
          break
        }
      }
      return findPageItem?.component || page404
    }
  }, [page])

  // The props on the page will have the isKBlock attribute
  // @ts-ignore
  return <PageComponent isKBlock={isKBlock} />
}
export default PageGetter
