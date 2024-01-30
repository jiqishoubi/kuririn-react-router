import { createContext } from 'react'
import { IKRouterProps, IPageItem } from '../KRouter'
import { BrowserHistory, HashHistory, createBrowserHistory, createHashHistory } from 'history'
import Page404 from '../404'
import { getIsTab } from '../utils'
import { IHistoryType } from '../hooks/useHistory'

export const browserHistory = createBrowserHistory()
export const hashHistory = createHashHistory()

/**
 * types
 */

export interface IPage {
  stamp: number
  pathname: string
  search: string
  url: string
  isTab?: boolean
  isTabActive?: boolean
}

export interface IKState {
  historyType: IHistoryType
  history: BrowserHistory | HashHistory
  allPageItems: IPageItem[]
  page404: any
  pages: IPage[] // 页面栈
}

export interface IKContext {
  state: IKState
  dispatch: (action: IKAction) => void
}

export type IKAction =
  | {
      type: 'push'
      payload: IPage
    }
  | {
      type: 'back'
      payload: number
    }
  | {
      type: 'switch'
      payload: IPage
    }
  | {
      type: 'replace'
      payload: {
        curPathname: string
        page: IPage
      }
    }

/**
 * context
 */
export const defaultInitialState: IKState = {
  historyType: 'browser',
  history: browserHistory,
  allPageItems: [],
  page404: Page404,
  pages: [],
}

export const KContext = createContext<IKContext>({
  state: defaultInitialState,
  dispatch: () => {},
})

export const KProvider = KContext.Provider

export function stateInitializer(defaultInitialState: IKState, props: IKRouterProps): IKState {
  const { historyType = 'browser', pages: allPageItems_, page404 } = props

  const allPageItems = (() => {
    function wrapComponent(Component: any) {
      return (props: any) => {
        return <Component {...props} />
      }
    }

    return allPageItems_.map((pageItem) => {
      return {
        ...pageItem,
        component: wrapComponent(pageItem.component),
      }
    })
  })()

  const _historyType = historyType || defaultInitialState.historyType
  const history = _historyType === 'hash' ? hashHistory : browserHistory
  const _page404 = page404 || defaultInitialState.page404

  const url = history.location.pathname + history.location.search
  const isTab = getIsTab(allPageItems, { url })
  const page = getPage(allPageItems, url, {
    ...(isTab ? { isTabActive: true } : {}),
  })
  history.replace(url, page)

  const pages = [page]

  return {
    historyType: _historyType,
    history,
    allPageItems,
    page404: _page404,
    pages,
  }
}

export function reducer(state: IKState, action: IKAction): IKState {
  const { pages } = state
  const { type, payload } = action

  switch (type) {
    case 'push': {
      const page = payload
      return {
        ...state,
        pages: [...pages, page],
      }
    }

    case 'back': {
      const n = payload
      return {
        ...state,
        pages: pages.slice(0, pages.length + n),
      }
    }

    case 'switch': {
      const p: IPage = { ...payload, isTabActive: true }
      const _pages = pages.filter((page) => page.isTab)
      const toPathname = p.pathname
      let nextPages: IPage[] = []
      if (!pages.some((page) => page.pathname === toPathname)) {
        // 还没打开这个tab
        // console.log('🚀 ~ ', `I haven't opened this tab yet`)
        nextPages = _pages
          .map((page) => {
            return {
              ...page,
              isTabActive: false,
            }
          })
          // @ts-ignore
          .concat(p)
      } else {
        // 已经打开这个tab
        // console.log('🚀 ~ ', `This tab has already been opened`)
        nextPages = _pages.map((page) => {
          return {
            ...page,
            isTabActive: page.pathname === toPathname,
          }
        })
      }

      return {
        ...state,
        pages: nextPages,
      }
    }

    case 'replace': {
      const { curPathname, page } = payload
      const index = pages.findIndex((page) => page.pathname === curPathname)
      if (index > -1) {
        return {
          ...state,
          pages: [...pages.slice(0, index), page, ...pages.slice(index + 1)],
        }
      }
      return state
    }

    default: {
      return state
    }
  }
}

/**
 * @description get page data by url or pathname
 * @param allPageItems
 * @param url
 * @param params // extra params for page data object (optional) eg: { isTab: true }
 * @returns
 */
export function getPage(allPageItems: IPageItem[], url: string, params: Partial<IPage> = {}): IPage {
  const stamp = new Date().getTime()
  const pathname = url.split('?')[0]
  const isTab = getIsTab(allPageItems, { pathname })
  return {
    stamp: stamp,
    pathname: pathname,
    search: url.split('?')[1] || '',
    url: url,
    ...(isTab ? { isTab: true } : {}),
    ...params,
  }
}
