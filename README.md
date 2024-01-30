<p align="center" style="color: #343a40">
  <img src="https://raw.githubusercontent.com/jiqishoubi/kuririn-react-router/master/static/kuririn-logo.jpg" alt="kuririn-react-router logo" width="130">
  <h1 align="center">Welcome to kuririn-react-router</h1>
</p>

English | [简体中文](https://github.com/jiqishoubi/kuririn-react-router/blob/master/README.zh-CN.md)

Kuririn-react-router is a routing library for mobile H5 that can simulate the effect of page stacks in apps (or mini programs), achieve page push, back, and replace, and support browser forward and backward buttons

## Demo

In the example, `index` is the first level page, `detail1` is the second level page, and `detail2` is the third level page

[Demo gif](https://github.com/jiqishoubi/kuririn-react-router/blob/master/static/demo_01.gif)

[More detailed demonstration code example](https://github.com/jiqishoubi/kuririn-react-router)

## KRouter

### Props

| prop                       | description                                                                                                | type                  | required | default   |
| -------------------------- | ---------------------------------------------------------------------------------------------------------- | --------------------- | -------- | --------- |
| historyType                |                                                                                                            | `'hash' \| 'browser'` | false    | 'browser' |
| pages                      | all page items                                                                                             | `IPageItem[]`         | true     | -         |
| page404                    | 404 component                                                                                              |                       | false    | -         |
| lazyLoading                | lazy loading component                                                                                     | `React.ReactNode`     | false    | -         |
| children                   | Usually used to pass in Tabbar, it is a position fixed component                                           | `React.ReactNode`     | false    | -         |
| closeDocumentFragmentCache | disable the optimization of document fragment caching on the page? This optimization is enabled by default | `boolean`             | false    | -         |

```ts
export interface IPageItem {
  path: string
  title?: string // Can affect document.title
  component: IPageItemComponent
  isTab?: boolean
}
```

Entry file `App.tsx`

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
