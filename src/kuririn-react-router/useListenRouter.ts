import { useEffect } from 'react'
import router, { gethistory, getPage, getPathname, getUrl } from './router'
import stack, { IPage } from './stack'
import cloneDeep from 'lodash/cloneDeep'
import throttle from 'lodash/throttle'

/**
 *
 * 这里是由浏览器前进后退，路由变化，触发的popstate事件，所以不需要处理router了，直接处理stack里的pages data
 * This is the pop state event triggered by browser forward and backward, routing changes, so there is no need to handle the router, just handle the pages data in the stack
 */
function _listen(evt: PopStateEvent) {
  console.log('🚀 ~ popstate evt:', evt)
  const pages = stack.pages

  const page = evt.state.usr as IPage

  /**
   * Operate stack
   * This `page` is the one you will be going to
   */
  function handle(page: IPage) {
    if (page.isTab) {
      stack.switchPage(page)
      return
    }

    // ↓
    // 判断前进还是后退

    const findIndex = pages.findIndex((p) => {
      return (
        p.stamp === page.stamp //
      )
    })

    if (findIndex > -1 && findIndex < pages.length - 1) {
      // 后退
      console.log('🚀 ~ 后退')
      // pages里还存在着 有这个stamp的page，就 stack.backPage
      // There are still pages with this stamp in the pages, just stack.backPage
      stack.backPage(-(pages.length - 1 - findIndex))
    } else {
      // 前进
      console.log('🚀 ~ 前进')
      // pages里已经没有了，就 statck.pushPage
      // There are no more pages, just statck.pushPage
      stack.pushPage(page)
    }
  }

  if (page) {
    handle(page)
  } else {
    // sometimes page is undefined
    setTimeout(() => {
      const url = getUrl()
      const page = getPage(url)
      handle(page)
    }, 0)
  }
}
const listenFunc = throttle(_listen, 12, { leading: true, trailing: false })

//
/**
 *
 * @description 监听popstate事件，更新stack
 * Listen for pop state events and update the stack
 */
export default function useListenRouter() {
  useEffect(() => {
    // go first page
    const url = getUrl()
    router._fisrtPage(url)

    // listen
    window.addEventListener('popstate', listenFunc, false)
    return () => {
      window.removeEventListener('popstate', listenFunc, false)
    }
  }, [])
}
