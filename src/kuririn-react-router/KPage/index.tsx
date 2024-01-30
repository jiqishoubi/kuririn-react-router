import React, { CSSProperties, PropsWithChildren, useEffect, useLayoutEffect } from 'react'
import { IPage } from '../store'
import { getPageKey } from '../utils'

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

  // 优化 - 通过文档碎片缓存页面
  useLayoutEffect(() => {
    if (!isKBlock) {
      // if (page.isTab) return // tab页面不需要缓存 // 测试
      const pageDom = document.getElementById(key)
      if (pageDom) {
        const fragment = document.createDocumentFragment()
        fragment.appendChild(pageDom)
        if (!(window as any)._kuririn_react_router_page_cache) {
          ;(window as any)._kuririn_react_router_page_cache = {}
        }
        ;(window as any)._kuririn_react_router_page_cache[key] = fragment
        // pageDom.remove() // 不需要移除，加入文档碎片后，会自动移除
      }
    } else {
      if (!(window as any)._kuririn_react_router_page_cache) {
        return
      }
      const fragment = (window as any)._kuririn_react_router_page_cache[key]
      if (fragment) {
        const parentDom = document.querySelector(page.isTab ? '._k_pages_container_tab' : '._k_pages_container_normal')
        if (parentDom) {
          parentDom.appendChild(fragment)
        }
      }
    }
  }, [isKBlock])

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
