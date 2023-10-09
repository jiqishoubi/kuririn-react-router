import { useEffect } from 'react'
import router, { getHistory, getPage } from './router'
import stack, { IPage } from './stack'
import cloneDeep from 'lodash/cloneDeep'
import throttle from 'lodash/throttle'

// listen popstate callback
function _listen(evt: PopStateEvent) {
  // console.log('🚀 ~ pop evt:', evt)
  const pages = stack.pages

  const page = evt.state.usr as IPage

  // 操作stack
  function handle(page: IPage) {
    if (page.isTab) {
      stack.switchPage(page)
      return
    }

    const findIndex = pages.findIndex((p) => p.stamp === page.stamp || p.pathname === page.pathname)

    if (findIndex > -1 && findIndex < pages.length - 1) {
      // 后退
      // console.log('🚀 ~ 后退')
      // pages里还存在着 有这个stamp的page，就 stack.backPage
      stack.backPage(-(pages.length - 1 - findIndex))
    } else {
      // 前进
      // console.log('🚀 ~ 前进')
      // pages里已经没有了，就 statck.pushPage
      stack.pushPage(page)
    }
  }

  if (page) {
    handle(page)
  } else {
    setTimeout(() => {
      const url = getHistory()?.location.pathname + getHistory()?.location.search
      const page = getPage(url)
      handle(page)
    }, 0)
  }
}
const listenFunc = throttle(_listen, 10, { leading: true, trailing: false })

/**
 *
 * @description 监听popstate事件，更新stack
 */
export default function useRouter() {
  useEffect(() => {
    const pathname = getHistory()?.location.pathname || window.location.pathname
    router.push(pathname)

    // listen
    window.addEventListener('popstate', listenFunc, false)

    return () => {
      window.removeEventListener('popstate', listenFunc, false)
    }
  }, [])
}
