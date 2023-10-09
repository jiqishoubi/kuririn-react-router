import React, { PropsWithChildren } from 'react'
import PageGetter from '../PageGetter'
import { observer } from 'mobx-react'
import stack from '../stack'
import useRouter from '../useRouter'
import cloneDeep from 'lodash/cloneDeep'
import { IHistoryType, setHistory } from '../router'

export type IPathComponent = React.FC<any> | React.ComponentClass | React.ComponentType | React.ReactElement

export interface IPageItem {
  path: string
  component: IPathComponent
}

export interface IKRoutesProps {
  historyType?: IHistoryType
  pages: IPageItem[]
  page404?: IPathComponent
}

const KRoutes: React.FC<IKRoutesProps> = (props) => {
  const { historyType = 'browser', pages: allPages, page404 } = props

  setHistory(historyType)

  useRouter()

  const pages = stack.pages
  // console.log('🚀 ~ pages:', cloneDeep(pages))

  return (
    <>
      {pages.map((page, index) => {
        const key = `_${index}_${page.url}`
        const isKBlock = index === pages.length - 1 // 显示出来
        return (
          <div
            key={key}
            id={key}
            className="_kuririn_react_router_page"
            style={{
              overflow: 'auto',
              height: '100vh',
              display: isKBlock ? 'block' : 'none',
            }}
          >
            <PageGetter
              allPages={allPages}
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
