import React, { useContext, useMemo } from 'react'
import PageGetter from '../PageGetter'
import KPage from '../KPage'
import { IPage, KContent } from '../store'

const KRoutes: React.FC = (props) => {
  const {
    state: { allPageItems, pages, history, page404: ComponentPage404 },
  } = useContext(KContent)

  const pathname = history.location.pathname

  // console.log("🚀 ~ allPageItems:", allPageItems)
  // console.log('🚀 ~ pages:', pages)

  const curPageItem = useMemo(() => allPageItems.find((pageItem) => pageItem.path === pathname), [allPageItems, pathname])

  // 分离出pages data 中的，tabPages和normalPages
  // Separate tabPages and normalPages from the pages data
  const pagesRes = useMemo(() => {
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
  }, [pages])

  return (
    <div
      id="_K_app"
      style={{
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {!curPageItem ? (
        <ComponentPage404 />
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
            <KPage key={key} page={page} isKBlock={isKBlock}>
              <PageGetter page={page} isKBlock={isKBlock} />
            </KPage>
          )
        })
      )}
    </div>
  )
}

export default KRoutes
