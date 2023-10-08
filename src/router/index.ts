import { createBrowserHistory } from 'history'
import stack, { IPage } from './stack'

export const history = createBrowserHistory()

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

function handleForward(page: IPage) {
  history.forward()
  stack.pushPage(page)
}

function handleBack(n: number = -1) {
  history.go(n)
  stack.backPage(n)
}

const router = {
  push: handlePush,
  forward: handleForward,
  back: handleBack,
}

export default router
