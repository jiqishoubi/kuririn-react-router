import { KRoutes, router } from '@/kuririn-react-router'
import PageIndex from '@/pages/index/index'
import PageDetail1 from '@/pages/detail1/index'
import PageDetail2 from '@/pages/detail2/index'
import PageWodeIndex from '@/pages/wode/index/index'

function App() {
  return (
    <>
      <KRoutes
        pages={[
          { path: '/index', component: PageIndex, isTab: true },
          { path: '/detail1', component: PageDetail1 },
          { path: '/detail2', component: PageDetail2 },
          { path: '/detail2', component: PageDetail2 },
          { path: '/wode', component: PageWodeIndex, isTab: true },
        ]}
      />

      <div
        style={{
          position: 'fixed',
          bottom: 0,
          zIndex: 10,
        }}
      >
        <button
          onClick={() => {
            router.switchTab('/index')
          }}
        >
          首页
        </button>
        <button
          onClick={() => {
            router.switchTab('/wode')
          }}
        >
          我的
        </button>
      </div>
    </>
  )
}

export default App
