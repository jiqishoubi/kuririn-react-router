import { createBrowserHistory, createHashHistory, BrowserHistory, HashHistory } from 'history'
import stack, { IPage } from './stack'
import { IPageItem } from './KRoutes'

const history_bak = createBrowserHistory()

export type IHistoryType = 'hash' | 'browser'

// global variable
export const kdata: {
  historyType?: IHistoryType
  history?: BrowserHistory | HashHistory
  allPageItems?: IPageItem[]
} = {}

export function initKData({ historyType, allPageItems }: { historyType: IHistoryType; allPageItems: IPageItem[] }) {
  if (!kdata.history) {
    kdata.historyType = historyType
    kdata.history = historyType === 'hash' ? createHashHistory() : createBrowserHistory()
    kdata.allPageItems = allPageItems
  }
}

export function gethistory() {
  return kdata.history! || history_bak
}

// 根据url获取page data
// Obtain page data based on the URL
export function getPage(url: string, params: Partial<IPage> = {}): IPage {
  const stamp = new Date().getTime()
  const pathname = url.split('?')[0]
  const isTab = kdata.allPageItems?.some((page) => page.path === pathname && page.isTab)
  return {
    stamp: stamp,
    pathname: pathname,
    search: url.split('?')[1] || '',
    url: url,
    ...(isTab ? { isTab: true } : {}),
    ...params,
  }
}

export function getPathname() {
  return gethistory().location.pathname || window.location.pathname
}

export function getUrl() {
  return gethistory().location.pathname + gethistory().location.search
}

/**
 * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
 * router functions
 * 1. fisrt handle router
 * 2. second handle pages data(by stack)
 */

function handlePush(url: string) {
  const page = getPage(url)

  gethistory().push(url, page)
  stack.pushPage(page)
}

/**
 *
 * back只是触发history的back，进而触发popstate,在popstate中去操作stack
 */
function handleBack(n: number = -1) {
  gethistory().go(n)
}

function handleSwitchTab(url: string) {
  const page = getPage(url, { isTabActive: true })

  gethistory().replace(url)
  stack.switchPage(page)
}

function handleFisrtPage(url: string) {
  const pathname = url.split('?')[0]
  const isTab = kdata.allPageItems?.some((page) => page.path === pathname && page.isTab)
  if (isTab) {
    router.switchTab(url)
  } else {
    // router.push(url) ×
    // here cannot use router.push(url), because fisrt page will trigger history's popstate
    // directly operate stack
    const page = getPage(url)
    gethistory().replace(url, page) // if don't replace, the fisrt state.stamp will not push to stack
    stack.pushPage(page)
  }
}

function handleReplace(url: string) {
  const page = getPage(url)

  const curPathname = getPathname()
  gethistory().replace(url, page)
  stack.replacePage(curPathname, page)
}

const router = {
  _fisrtPage: handleFisrtPage, // KRoutes fisrt mounted 执行
  push: handlePush,
  back: handleBack,
  switchTab: handleSwitchTab,
  replace: handleReplace,
}

export default router
