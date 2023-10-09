import React from 'react'
import PageGetter from '../PageGetter'
import { observer } from 'mobx-react'
import stack from '../stack'
import useRouter from '../useRouter'
import cloneDeep from 'lodash/cloneDeep'
import { IHistoryType, setHistory } from '../router'

export interface IPageItem {
  path: string
  component: React.FC
}

export interface IKRoutesProps {
  historyType?: IHistoryType
  pages: IPageItem[]
  page404?: React.FC
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
        return (
          <div
            key={key}
            id={key}
            className="_kuririn_react_router_page"
            style={{
              overflow: 'auto',
              height: '100vh',
              display: index === pages.length - 1 ? 'block' : 'none',
            }}
          >
            <PageGetter allPages={allPages} page={page} page404={page404} />
          </div>
        )
      })}
    </>
  )
}
export default observer(KRoutes)
