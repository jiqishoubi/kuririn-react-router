import { IPageItem } from './KRouter'
import { IPage } from './store'

export function getPageKey(page: IPage) {
  return `_k_${page.url}` // 包含pathname和search
}

/**
 * Page是页面栈的对象
 * @description get page data by url or pathname
 * @param allPageItems
 * @param url
 * @returns
 */
export function getPage(allPageItems: IPageItem[], url: string): IPage {
  const stamp = new Date().getTime()
  const pathname = url.split('?')[0]
  const pageItem = getPageItem(allPageItems, { url })
  const isTab = pageItem?.isTab
  return {
    stamp: stamp,
    pathname: pathname,
    search: url.split('?')[1] || '',
    url: url,
    title: pageItem?.title || '',
    ...(isTab ? { isTab: true } : {}),
  }
}

/**
 * PageItem 是组件入参pages的对象
 * @param allPageItems
 * @param url
 * @returns
 */
export function getPageItem(
  allPageItems: IPageItem[],
  options: {
    pathname?: string
    url?: string
  }
) {
  const { pathname, url } = options
  const p = pathname || url?.split('?')[0]
  for (let i = 0; i < allPageItems.length; i++) {
    const pageItem = allPageItems[i]
    if (pageItem.path === p) {
      return pageItem
    }
  }
}
