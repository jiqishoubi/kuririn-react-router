import React, { useContext, useEffect, useMemo } from 'react'
import { IPage, KContent } from '../store'

const PageGetter: React.FC<{
  page: IPage
  isKBlock: boolean
}> = (props) => {
  const { page, isKBlock } = props

  const {
    state: { allPageItems, page404 },
  } = useContext(KContent)

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
  }, [allPageItems, page])

  return <PageComponent isKBlock={isKBlock} />
  // return PageComponent
}
export default PageGetter
