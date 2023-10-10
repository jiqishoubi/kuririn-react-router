import React, { CSSProperties, PropsWithChildren } from 'react'
import { IPage } from '../stack'
import { IPageItemComponent } from '../KRoutes'

const KPage: React.FC<
  PropsWithChildren<{
    page: IPage
    isKBlock: boolean
  }>
> = (props) => {
  const { children, page, isKBlock } = props

  const key = `_k_${page.url}`
  const classNameStr = '_kuririn_react_router_page' + (page.isTab ? ' _kuririn_react_router_page_tab' : '')
  const defaltPageStyle: CSSProperties = {
    overflow: 'auto',
    height: '100vh',
  }

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
