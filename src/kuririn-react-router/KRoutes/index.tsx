/// Entry file
import React, { CSSProperties, useMemo } from 'react'
import PageGetter from '../PageGetter'
import { observer } from 'mobx-react'
import stack, { IPage } from '../stack'
import useListenRouter from '../useListenRouter'
import cloneDeep from 'lodash/cloneDeep'
import { IHistoryType, getPathname, gethistory, initKData } from '../router'
import KPage from '../KPage'
import Page404 from '../404'

export type IPageItemComponent = any // React.FC<any> | React.ComponentClass | React.ComponentType | React.ReactElement

// 传给KRoutes的pages的每一项
// Each item of the pages passed to KRoutes
export interface IPageItem {
  path: string
  component: IPageItemComponent
  isTab?: boolean
}

export interface IKRoutesProps {
  historyType?: IHistoryType
  pages: IPageItem[]
  page404?: IPageItemComponent
}

/**
 *
 * @description Entrance component
 */
const KRoutes: React.FC<IKRoutesProps> = (props) => {
  const { historyType = 'browser', pages: allPageItems, page404 } = props

  // 初始化 传进来的一些值
  // Initialize some values passed in
  initKData({
    historyType,
    allPageItems,
  })

  useListenRouter() // to listen history
  // init end

  const _page404 = page404 || Page404

  const pathname = getPathname()
  const pages = stack.pages
  console.log('🚀 ~ 页面栈 pages:', cloneDeep(pages))

  const curPageItem = useMemo(() => allPageItems.find((pageItem) => pageItem.path === pathname), [allPageItems, pathname])

  // 分离出pages data 中的，tabPages和normalPages
  // Separate tabPages and normalPages from the pages data
  const pagesRes = (() => {
    let tabPages: IPage[] = []
    let normalPages: IPage[] = []
    pages.forEach((page) => {
      if (page.isTab) {
        tabPages.push(page)
      } else {
        normalPages.push(page)
      }
    })
    return {
      tabPages,
      normalPages,
    }
  })()

  return (
    <div
      id="_K_app"
      style={{
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {!curPageItem ? (
        <_page404 />
      ) : (
        pages.map((page) => {
          const key = `_k_${page.url}`

          const isKBlock = (() => {
            if (curPageItem.isTab) {
              // 当前访问的是tab页面
              // Currently accessing a tab page
              return !!(curPageItem.path === page.pathname && pagesRes.tabPages.find((tabPage) => tabPage.pathname === curPageItem?.path)?.isTabActive)
            } else {
              // 当前访问的是普通页面
              // Currently accessing a regular page
              return !!(curPageItem.path === page.pathname && pagesRes.normalPages[pagesRes.normalPages.length - 1]?.pathname === curPageItem?.path)
            }
          })()

          return (
            <KPage
              //
              key={key}
              page={page}
              isKBlock={isKBlock}
            >
              <PageGetter
                //
                page={page}
                page404={_page404}
                isKBlock={isKBlock}
              />
            </KPage>
          )
        })
      )}
    </div>
  )
}

export default observer(KRoutes)
