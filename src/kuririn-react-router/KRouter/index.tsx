/// Entry file
import React, { PropsWithChildren, Suspense, useReducer } from 'react'
import { KProvider, defaultInitialState, stateInitializer, reducer, IKAction, IKState } from '../store'
import KRoutes from '../KRoutes'
import { IHistoryType } from '../hooks/useHistory'
import useListenRouter from '../hooks/useListenRouter'

export type IPageItemComponent = any
// () => React.ReactNode | React.FC<{}> | React.ComponentClass | React.ComponentType | React.ReactElement | React.LazyExoticComponent<React.FC<any>>

export interface IPageItem {
  path: string
  component: IPageItemComponent
  isTab?: boolean
}

export interface IKRouterProps {
  historyType?: IHistoryType
  pages: IPageItem[]
  page404?: IPageItemComponent
  lazyLoading?: React.ReactNode
}

/**
 *
 */
const KRouter: React.FC<PropsWithChildren<IKRouterProps>> = (props) => {
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
      <Suspense fallback={lazyLoading || <div>loading...</div>}>
        <KRoutes />
      </Suspense>

      {children}
    </KProvider>
  )
}
export default KRouter
