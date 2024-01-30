import React, { CSSProperties, PropsWithChildren, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { IPage } from '../store'
import { getPageKey } from '../utils'
import useDocumentFragmentCache from './useDocumentFragmentCache'

const defaltPageStyle: CSSProperties = {
  height: '100%',
  overflow: 'auto',
}

const KPage: React.FC<
  PropsWithChildren<{
    page: IPage
    isKBlock: boolean
  }>
> = (props) => {
  const { children, page, isKBlock } = props

  const key = getPageKey(page)
  const classNameStr = '_kuririn_react_router_page' + (page.isTab ? ' _kuririn_react_router_page_tab' : '')

  // 优化
  const scrollTopRef = useRef(0)
  useDocumentFragmentCache({ page, isKBlock, scrollTopRef })

  return (
    <div
      key={key}
      id={key}
      className={classNameStr}
      style={{
        ...defaltPageStyle,
        display: isKBlock ? 'block' : 'none',
      }}
      onScroll={(e) => {
        const dom = e.target as HTMLDivElement
        scrollTopRef.current = dom.scrollTop
      }}
    >
      {children}
    </div>
  )
}
export default KPage
