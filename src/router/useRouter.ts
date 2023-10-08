import { useEffect } from 'react'
import router, { history } from '.'
import stack, { IPage } from './stack'
import cloneDeep from 'lodash/cloneDeep'

function listen(evt: PopStateEvent) {
  console.log('🚀 ~ evt:', evt)
  const pages = stack.pages
  console.log('🚀 ~ pages:', cloneDeep(pages))

  const page = evt.state.usr as IPage

  const findStampIndex = pages.findIndex((p) => p.stamp === page.stamp)

  if (findStampIndex > -1 && findStampIndex < pages.length - 1) {
    // 后退
    console.log('🚀 ~ 后退')
    router.back(pages.length - findStampIndex - 1)
  } else {
    // 前进
    console.log('🚀 ~ 前进')
    router.forward(page)
  }

  setTimeout(() => {
    console.log('🚀 ~ pages end:', cloneDeep(stack.pages))
  }, 0)
}

export default function useRouter() {
  useEffect(() => {
    const pathname = history.location.pathname
    router.push(pathname)

    window.addEventListener('popstate', listen, false)

    return () => {
      window.removeEventListener('popstate', listen)
    }
  }, [])
}
