import { KRouter } from '@/kuririn-react-router'
import TabBar from '@/TabBar'
// import PageIndex from '@/pages/index/index'
import PageDetail1 from '@/pages/detail1/index'
import PageDetail2 from '@/pages/detail2/index'
import PageUserIndex from '@/pages/user/index/index'
import { lazy } from 'react'

const PageIndex = lazy(() => import('@/pages/index/index'))

function App() {
  return (
    <>
      <KRouter
        pages={[
          { path: '/', component: PageIndex, isTab: true },
          { path: '/detail1', component: PageDetail1 },
          { path: '/detail2', component: PageDetail2 },
          { path: '/detail2', component: PageDetail2 },
          { path: '/user', component: PageUserIndex, isTab: true },
        ]}
      >
        <TabBar />
      </KRouter>
    </>
  )
}

export default App
