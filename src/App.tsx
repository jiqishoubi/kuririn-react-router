import { lazy, useEffect } from 'react'
import { KRouter, IKRouterProps } from '@/kuririn-react-router'
import TabBar from '@/components/TabBar'
import PageUserIndex from '@/pages/user/index'
import PageDetail from '@/pages/detail'
import PageSubDetail from '@/pages/subDetail'

export const pagesConfig: IKRouterProps['pages'] = [
  { path: '/', component: lazy(() => import('@/pages/index/index')), isTab: true }, // support lazy loading
  { path: '/user', component: PageUserIndex, isTab: true },
  { path: '/detail', title: '详情', component: PageDetail },
  { path: '/subDetail', title: '二级详情', component: PageSubDetail },
  { path: '/userSub', title: 'user的子页面', component: lazy(() => import('@/pages/user/useSubPage')) },
]

function App() {
  useEffect(() => {
    console.log('🚀 ~ app launch')
  }, [])
  return (
    <KRouter pages={pagesConfig}>
      <TabBar />
    </KRouter>
  )
}

export default App
