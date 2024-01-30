import React, { useContext, useMemo } from 'react'
import PageGetter from '../PageGetter'
import KPage from '../KPage'
import { IPage, KContext } from '../store'

interface IKRoutesProps {
  children?: React.ReactNode
}

const KRoutes: React.FC<IKRoutesProps> = (props) => {
  const { children } = props
  const {
    state: { allPageItems, pages, history, page404: ComponentPage404 },
  } = useContext(KContext)

  const pathname = history.location.pathname

  console.log('🚀 ~ allPageItems:', allPageItems)
  console.log('🚀 ~ pages:', pages)

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

  console.log('🚀 ~ pagesRes', pagesRes)

  return (
    <>
      {!curPageItem ? (
        <ComponentPage404 />
      ) : (
        <>
          {pagesRes.tabPages.length > 0 && (
            <div
              className="_k_pages_container _k_pages_container_tab"
              style={{
                display: curPageItem.isTab ? 'block' : 'none',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {pagesRes.tabPages.map((page) => {
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
              })}
              {children}
            </div>
          )}

          {pagesRes.normalPages.length > 0 && (
            <div
              className="_k_pages_container _k_pages_container_normal"
              style={{
                display: !curPageItem.isTab ? 'block' : 'none',
                position: 'relative',
                zIndex: 2,
              }}
            >
              {pagesRes.normalPages.map((page) => {
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
              })}
            </div>
          )}
        </>
      )}
    </>
  )
}

export default KRoutes
