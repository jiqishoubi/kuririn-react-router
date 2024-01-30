import React, { CSSProperties, PropsWithChildren } from 'react'
import { IPage } from '../store'
import { getPageKey } from '../utils'

const defaltPageStyle: CSSProperties = {
  overflow: 'auto',
  height: '100vh',
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

  return (
    <div
      key={key}
      id={key}
      className={classNameStr}
      style={{
        ...defaltPageStyle,
        display: isKBlock ? 'block' : 'none',
      }}
    >
      {children}
    </div>
  )
}
export default KPage
