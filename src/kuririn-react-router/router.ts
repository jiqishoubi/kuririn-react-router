import { createBrowserHistory, createHashHistory, BrowserHistory, HashHistory } from 'history'
import stack, { IPage } from './stack'

export type IHistoryType = 'hash' | 'browser'

class History {
  static history: BrowserHistory | HashHistory
}

export function setHistory(historyType: IHistoryType) {
  if (!History.history) {
    const h = historyType === 'hash' ? createHashHistory() : createBrowserHistory()
    History.history = h
  }
}

export function getHistory() {
  return History.history
}

/**
 *
 * 只有push时，才去操作stack
 * back只是触发history的back，进而触发popstate,在popstate中去操作stack
 */

function handlePush(url: string) {
  const stamp = new Date().getTime()
  const page: IPage = {
    stamp: stamp,
    pathname: url.split('?')[0],
    search: url.split('?')[1] || '',
    url: url,
  }

  getHistory().push(url, page)
  stack.pushPage(page)
}

function handleBack(n: number = -1) {
  getHistory().go(n)
}

const router = {
  push: handlePush,
  back: handleBack,
}

export default router
