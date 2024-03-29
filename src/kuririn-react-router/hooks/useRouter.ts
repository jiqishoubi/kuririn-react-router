import { useContext } from 'react'
import { KContext } from '../store'
import { getPage } from '../utils'

/**
 * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
 * router functions
 * 1. fisrt handle router
 * 2. second handle pages data(by stack)
 */

export default function useRouter() {
  const {
    state: { history, allPageItems },
    dispatch,
  } = useContext(KContext)

  const curPathname = history.location.pathname

  function handlePush(url: string) {
    const page = getPage(allPageItems, url)
    history.push(url, page)
    dispatch({ type: 'push', payload: page })
  }

  /**
   *
   * back只是触发history的back，进而触发popstate,在popstate中去操作stack
   */
  function handleBack(n: number = -1) {
    history.go(n) // 这里会触发 window 的 popstate
  }

  function handleSwitchTab(url: string) {
    if (history.location.pathname === url) return
    const page = getPage(allPageItems, url)
    history.replace(url)
    dispatch({ type: 'switch', payload: page })
  }

  function handleReplace(url: string) {
    const page = getPage(allPageItems, url)
    history.replace(url, page)
    dispatch({
      type: 'replace',
      payload: {
        curPathname,
        page,
      },
    })
  }

  return {
    push: handlePush,
    back: handleBack,
    switchTab: handleSwitchTab,
    replace: handleReplace,
  }
}
