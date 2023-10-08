import { createBrowserHistory } from 'history'
import stack, { IPage } from './stack'

export const history = createBrowserHistory()

function handlePush(url: string) {
  const stamp = new Date().getTime()
  const page: IPage = {
    id: stamp + '',
    stamp: stamp,
    title: stamp + '',
    pathname: url.split('?')[0],
    search: url.split('?')[1] || '',
    href: url,
  }

  history.push(url, page)
  stack.pushPage(page)
}

const router = {
  push: handlePush,
}

export default router
