import { useEffect } from 'react'
import stack from './stack'
import { getHistory } from './router'
import cloneDeep from 'lodash/cloneDeep'

export default function onPageShow(callback: Function) {
  const pathname = getHistory().location.pathname
  const pages = stack.pages

  useEffect(() => {
    console.log('🚀 ~ ', window.history)

    console.log('🚀 ~ pages', cloneDeep(pages))
    console.log('🚀 ~ pathname', pathname)
  }, [pathname, pages])
}
