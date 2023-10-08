import { useEffect } from 'react'
import router, { history } from '.'
import stack, { IPage } from './stack'
import cloneDeep from 'lodash/cloneDeep'
import throttle from 'lodash/throttle'

function _listen(evt: PopStateEvent) {
  // console.log('🚀 ~ pop evt:', evt)
  const pages = stack.pages
  // console.log('🚀 ~ pages:', cloneDeep(pages))

  const page = evt.state.usr as IPage

  const findStampIndex = pages.findIndex((p) => p.stamp === page.stamp)

  if (findStampIndex > -1 && findStampIndex < pages.length - 1) {
    // 后退
    // console.log('🚀 ~ 后退')
    stack.backPage(-(pages.length - 1 - findStampIndex))
  } else {
    // 前进
    // console.log('🚀 ~ 前进')
    stack.pushPage(page)
  }

  // setTimeout(() => {
  //   console.log('🚀 ~ pages end:', cloneDeep(stack.pages))
  // }, 0)
}
const listenFunc = throttle(_listen, 400, { leading: true, trailing: false })

export default function useRouter() {
  useEffect(() => {
    const pathname = history.location.pathname
    router.push(pathname)

    window.addEventListener('popstate', listenFunc, false)

    return () => {
      window.removeEventListener('popstate', listenFunc, false)
    }
  }, [])
}
