// 使用文档碎片缓存page
// Use document fragments to cache pages
import { useContext, useLayoutEffect } from 'react'
import { IPage, KContext } from '../store'
import { getPageKey } from '../utils'

export default function useDocumentFragmentCache(options: {
  page: IPage
  isKBlock: boolean
  scrollTopRef: React.MutableRefObject<number> //
}) {
  const { page, isKBlock, scrollTopRef } = options

  const key = getPageKey(page)

  const {
    state: { closeDocumentFragmentCache },
  } = useContext(KContext)

  useLayoutEffect(() => {
    if (!closeDocumentFragmentCache) {
      if (!isKBlock) {
        if (page.isTab) return // tab页面不需要缓存 // 测试 todo
        const pageDom = document.getElementById(key)
        if (pageDom) {
          const fragment = document.createDocumentFragment()
          fragment.appendChild(pageDom)
          if (!(window as any)._kuririn_react_router_page_cache) {
            ;(window as any)._kuririn_react_router_page_cache = {}
          }
          const fragmentItem = {
            fragment,
            scrollTop: scrollTopRef.current || 0,
          }
          // console.log(`🚀 ~ fragmentItem:`, fragmentItem)
          ;(window as any)._kuririn_react_router_page_cache[key] = fragmentItem
          // 不需要移除，加入文档碎片后，会自动移除
          // No need to remove, after adding document fragments, they will be automatically removed
          // pageDom.remove()
        }
      } else {
        if (!(window as any)._kuririn_react_router_page_cache) {
          return
        }
        const fragmentItem = (window as any)._kuririn_react_router_page_cache[key]
        if (fragmentItem) {
          const parentDom = document.querySelector(page.isTab ? '._k_pages_container_tab' : '._k_pages_container_normal')
          if (parentDom) {
            parentDom.appendChild(fragmentItem.fragment)
            const pageDom = document.getElementById(key)
            if (pageDom) {
              pageDom.scrollTop = fragmentItem.scrollTop
            }
            // 删除 cache
            delete (window as any)._kuririn_react_router_page_cache[key]
          }
        }
      }
    }
  }, [isKBlock])
}
