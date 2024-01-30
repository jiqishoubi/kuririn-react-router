import React, { useContext, useMemo } from 'react'
import PageGetter from '../PageGetter'
import KPage from '../KPage'
import { IPage, KContext } from '../store'
import { getPageKey } from '../utils'

const k_pages_container_style: React.CSSProperties = {
  height: '100%',
  overflow: 'hidden',
  position: 'relative',
}

export interface IKRoutesProps {
  children?: React.ReactNode
}

const KRoutes: React.FC<IKRoutesProps> = (props) => {
  const { children } = props

  const {
    state: { allPageItems, pages, history, page404: ComponentPage404 },
  } = useContext(KContext)

  const pathname = history.location.pathname

  // console.log('🚀 ~ allPageItems:', allPageItems)
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
    <>
      {!curPageItem ? (
        <ComponentPage404 />
      ) : (
        // tab pages and normal pages will be rendered in different containers
        <>
          {pagesRes.tabPages.length > 0 && (
            <div
              className="_k_pages_container _k_pages_container_tab"
              style={{
                ...k_pages_container_style,
                display: curPageItem.isTab ? 'block' : 'none',
                zIndex: 1,
              }}
            >
              {pagesRes.tabPages.map((page) => {
                const key = getPageKey(page)

                const isKBlock = !!(
                  curPageItem.isTab && //
                  curPageItem.path === page.pathname &&
                  pagesRes.tabPages.find((tabPage) => tabPage.pathname === curPageItem?.path)?.isTabActive
                )

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
                ...k_pages_container_style,
                display: !curPageItem.isTab ? 'block' : 'none',
                zIndex: 2,
              }}
            >
              {pagesRes.normalPages.map((page) => {
                const key = getPageKey(page)

                const isKBlock = !!(
                  !curPageItem.isTab && //
                  curPageItem.path === page.pathname &&
                  pagesRes.normalPages[pagesRes.normalPages.length - 1]?.pathname === curPageItem?.path
                )

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
