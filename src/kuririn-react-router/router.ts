import { createBrowserHistory, createHashHistory, BrowserHistory, HashHistory } from 'history'
import stack, { IPage } from './stack'
import { IPageItem } from './KRoutes'

const history_bak = createBrowserHistory()

export type IHistoryType = 'hash' | 'browser'

export const kdata: {
  historyType?: IHistoryType
  history?: BrowserHistory | HashHistory
  allPageItems?: IPageItem[]
} = {}

export function setKData({ historyType, allPageItems }: { historyType: IHistoryType; allPageItems: IPageItem[] }) {
  if (!kdata.history) {
    kdata.historyType = historyType
    kdata.history = historyType === 'hash' ? createHashHistory() : createBrowserHistory()
    kdata.allPageItems = allPageItems
  }
}

export function getHistory() {
  return kdata.history! || history_bak
}

// 根据url获取page data
export function getPage(url: string, params: Partial<IPage> = {}): IPage {
  const stamp = new Date().getTime()
  const pathname = url.split('?')[0]
  const isTab = kdata.allPageItems?.some((page) => page.path === pathname && page.isTab)
  return {
    stamp: stamp,
    pathname: pathname,
    search: url.split('?')[1] || '',
    url: url,
    ...(isTab ? { isTab: true, isTabActive: true } : {}),
    ...params,
  }
}

/**
 *
 * 只有push时，才去操作stack
 * back只是触发history的back，进而触发popstate,在popstate中去操作stack
 */

function handlePush(url: string) {
  const page = getPage(url)

  getHistory().push(url, page)
  stack.pushPage(page)
}

function handleBack(n: number = -1) {
  getHistory().go(n)
}

function handleSwitchTab(url: string) {
  const page = getPage(url, { isTabActive: true })

  getHistory().replace(url)
  stack.switchPage(page)
}

const router = {
  push: handlePush,
  back: handleBack,
  switchTab: handleSwitchTab,
}

export default router
