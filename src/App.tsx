import { KRoutes, router } from '@/kuririn-react-router'
import PageIndex from '@/pages/index/index'
import PageDetail1 from '@/pages/detail1/index'
import PageDetail2 from '@/pages/detail2/index'
import PageUserIndex from '@/pages/user/index/index'

function App() {
  return (
    <>
      <KRoutes
        pages={[
          { path: '/', component: PageIndex, isTab: true },
          { path: '/detail1', component: PageDetail1 },
          { path: '/detail2', component: PageDetail2 },
          { path: '/detail2', component: PageDetail2 },
          { path: '/user', component: PageUserIndex, isTab: true },
        ]}
      />

      <div
        style={{
          position: 'fixed',
          bottom: 0,
          zIndex: 10,
          padding: 5,
          backgroundColor: '#b4b4b4',
        }}
      >
        <div style={{ fontSize: 17 }}>this is simple tab panel</div>
        <button
          onClick={() => {
            router.switchTab('/')
          }}
          style={{ padding: '0 10px' }}
        >
          index
        </button>
        <button
          onClick={() => {
            router.switchTab('/user')
          }}
          style={{ padding: '0 10px', marginLeft: 10 }}
        >
          user
        </button>
      </div>
    </>
  )
}

export default App
