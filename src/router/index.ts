import { createBrowserHistory } from 'history'
import stack, { IPage } from './stack'

export const history = createBrowserHistory()

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

  // console.log('🚀 ~ history', history)
  history.push(url, page)
  stack.pushPage(page)
}

function handleBack(n: number = -1) {
  history.go(n)
}

const router = {
  push: handlePush,
  back: handleBack,
}

export default router
