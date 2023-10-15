<p align="center" style="color: #343a40">
  <img src="https://raw.githubusercontent.com/jiqishoubi/kuririn-react-router/master/static/kuririn-logo.jpg" alt="kuririn-react-router logo" width="130">
  <h1 align="center">Welcome to kuririn-react-router</h1>
</p>

kuririn-react-router 是一个用于 H5 的路由库，它可以模拟 App（或小程序） 中页面栈的效果，实现页面的前进、后退、跳转，支持浏览器的前进、后退按钮

## 演示

例子中，index 是一级页面,detail1 是 二级页面，detail2 是 三级页面

[演示 gif](https://github.com/jiqishoubi/kuririn-react-router/blob/master/static/demo_01.gif)

[演示 代码](https://github.com/jiqishoubi/kuririn-react-router)

## KRouter

### Props

| 属性        | 说明                        | 类型                  | 是否必填 | 默认值    |
| ----------- | --------------------------- | --------------------- | -------- | --------- |
| historyType | 路由方式                    | `'hash' \| 'browser'` | false    | 'browser' |
| pages       | 全部的页面                  | `IPageItem[]`         | true     | -         |
| page404     | 可以传入 404 页面           |                       | false    | -         |
| lazyLoading | page 懒加载的时候的 loading | `React.ReactNode`     | false    | -         |

```ts
export interface IPageItem {
  path: string
  component: IPageItemComponent
  isTab?: boolean
}
```

入口文件`App.tsx`

```tsx
import { KRouter } from '@/kuririn-react-router'
import TabBar from '@/TabBar'
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
```

## useRouter

`import { useRouter } from 'kuririn-react-router'`

`const router = useRouter()`

### router.push

```ts
router.push('/detail1')
```

### router.back

```ts
router.back()
router.back(-1)
```

### router.replace

```ts
router.replace('/detail2')
```

### router.switchTab

```ts
router.switchTab('/')
router.switchTab('/user')
```

## onPageShow、onPageHide

```tsx
import { onPageShow, onPageHide } from 'kuririn-react-router'

onPageShow(props, () => {
  console.log('🚀 ~ ', 'index page show')
})

onPageHide(props, () => {
  console.log('🚀 ~ ', 'index page hide')
})
```
