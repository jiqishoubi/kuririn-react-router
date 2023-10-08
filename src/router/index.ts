import { createBrowserHistory } from 'history'
import stack from './stack'

export const history = createBrowserHistory()

function handlePush(url: string) {
  const pathnameFromUrl = url.split('?')[0]
  const pathname = history.location.pathname
  if (pathname !== pathnameFromUrl) {
    history.push(url)
  }

  stack.pushPage(pathnameFromUrl)
}

const router = {
  push: handlePush,
}

export default router
