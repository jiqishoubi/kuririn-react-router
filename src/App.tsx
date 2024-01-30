import { lazy } from 'react'
import { KRouter, IKRouterProps } from '@/kuririn-react-router'
import TabBar from '@/components/TabBar'
import PageUserIndex from '@/pages/user/index'
import PageDetail from '@/pages/detail'
import PageSubDetail from '@/pages/subDetail'

export const pagesConfig: IKRouterProps['pages'] = [
  { path: '/', component: lazy(() => import('@/pages/index/index')), isTab: true }, // lazy loading
  { path: '/user', component: PageUserIndex, isTab: true },
  { path: '/detail', pageTitle: '详情', component: PageDetail },
  { path: '/subDetail', pageTitle: '二级详情', component: PageSubDetail },
]

function App() {
  return (
    <KRouter pages={pagesConfig}>
      <TabBar />
    </KRouter>
  )
}

export default App
