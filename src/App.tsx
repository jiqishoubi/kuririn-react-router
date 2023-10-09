import { KRoutes } from '@/kuririn-react-router'
// import { KRoutes } from '../dist/es/index.js'
import PageIndex from '@/pages/index/index'
import PageDetail1 from '@/pages/detail1/index'
import PageDetail2 from '@/pages/detail2/index'

function App() {
  return (
    <KRoutes
      pages={[
        { path: '/', component: PageIndex },
        { path: '/detail1', component: PageDetail1 },
        { path: '/detail2', component: PageDetail2 },
      ]}
    />
  )
}

export default App
