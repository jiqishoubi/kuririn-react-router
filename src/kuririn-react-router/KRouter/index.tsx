/// Entry file
import React, { Suspense, useReducer } from 'react'
import { KProvider, defaultInitialState, stateInitializer, reducer, IKAction, IKState } from '../store'
import KRoutes from '../KRoutes'
import { IHistoryType } from '../hooks/useHistory'
import useListenRouter from '../hooks/useListenRouter'

export type IPageItemComponent = any
// () => React.ReactNode | React.FC<{}> | React.ComponentClass | React.ComponentType | React.ReactElement | React.LazyExoticComponent<React.FC<any>>

export interface IPageItem {
  path: string
  pageTitle?: string
  component: IPageItemComponent
  isTab?: boolean
}

export interface IKRouterProps {
  historyType?: IHistoryType
  pages: IPageItem[]
  page404?: IPageItemComponent
  lazyLoading?: React.ReactNode
  children?: React.ReactNode // this children styles set position fixed
}

/**
 *
 */
const KRouter: React.FC<IKRouterProps> = (props) => {
  const { children, lazyLoading } = props

  const [state, dispatch] = useReducer<(state: IKState, action: IKAction) => IKState, IKState>(reducer, defaultInitialState, (s) => stateInitializer(s, props))

  useListenRouter(state, dispatch) // to listen history

  return (
    <KProvider
      value={{
        state,
        dispatch,
      }}
    >
      <div
        id="_k_app"
        style={{
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <Suspense fallback={lazyLoading || <div>loading...</div>}>
          <KRoutes>{children}</KRoutes>
        </Suspense>
      </div>
    </KProvider>
  )
}
export default KRouter
