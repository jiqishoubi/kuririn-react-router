import React, { useMemo } from 'react'
import PageGetter from '../PageGetter'
import { observer } from 'mobx-react'
import stack, { IPage } from '../stack'
import useRouter from '../useRouter'
import cloneDeep from 'lodash/cloneDeep'
import { IHistoryType, getHistory, setKData } from '../router'

export type IPathComponent = React.FC<any> | React.ComponentClass | React.ComponentType | React.ReactElement

// 传给KRoutes的pages的每一项
export interface IPageItem {
  path: string
  component: IPathComponent
  isTab?: boolean
}

export interface IKRoutesProps {
  historyType?: IHistoryType
  pages: IPageItem[]
  page404?: IPathComponent
}

const KRoutes: React.FC<IKRoutesProps> = (props) => {
  const { historyType = 'browser', pages: allPageItems, page404 } = props

  // 初始化 传进来的一些值
  setKData({
    historyType,
    allPageItems,
  })

  useRouter()

  const pathname = getHistory().location.pathname
  const pages = stack.pages
  console.log('🚀 ~ pages:', cloneDeep(pages))

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

  const curPageItem = allPageItems.find((pageItem) => pageItem.path === pathname)

  return (
    <>
      {pages.map((page) => {
        const key = `_k_${page.url}`
        const classNameStr = '_kuririn_react_router_page' + (page.isTab ? ' _kuririn_react_router_page_tab' : '')

        const isKBlock = (() => {
          if (curPageItem) {
            if (curPageItem.isTab) {
              return !!(curPageItem.path === page.pathname && pagesRes.tabPages.find((tabPage) => tabPage.pathname === curPageItem?.path)?.isTabActive)
            } else {
              return !!(curPageItem.path === page.pathname && pagesRes.normalPages[pagesRes.normalPages.length - 1]?.pathname === curPageItem?.path)
            }
          }
          return false
        })()

        return (
          <div
            key={key}
            id={key}
            className={classNameStr}
            style={{
              overflow: 'auto',
              height: '100vh',
              display: isKBlock ? 'block' : 'none',
            }}
          >
            <PageGetter
              page={page}
              page404={page404} //
              isKBlock={isKBlock}
            />
          </div>
        )
      })}
    </>
  )
}
export default observer(KRoutes)
