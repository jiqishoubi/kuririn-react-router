<p align="center" style="color: #343a40">
  <img src="https://raw.githubusercontent.com/jiqishoubi/kuririn-react-router/master/static/kuririn-logo.jpg" alt="kuririn-react-router logo" width="130">
  <h1 align="center">Welcome to kuririn-react-router</h1>
</p>

English | [简体中文](https://github.com/jiqishoubi/kuririn-react-router/blob/master/README.zh-CN.md)

Kuririn-react-router is a routing library for H5 that can simulate the effect of page stacks in apps (or mini programs), achieve page push, back, and replace, and support browser forward and backward buttons

## Demo

In the example, `index` is the first level page, `detail1` is the second level page, and `detail2` is the third level page

[demo gif](https://github.com/jiqishoubi/kuririn-react-router/blob/master/static/demo.gif)

## KRoutes

### Props

| 属性        | 说明                           | 类型                  | 默认值    |
| ----------- | ------------------------------ | --------------------- | --------- |
| historyType |                                | `'hash' \| 'browser'` | 'browser' |
| pages       | All pages                      | `IPageItem[]`         | -         |
| page404     | Can pass in 404 page component |                       | -         |

```ts
export interface IPageItem {
  path: string
  component: IPageItemComponent
  isTab?: boolean
}
```

Entry file `App.tsx`

```tsx
import { KRoutes } from 'kuririn-react-router'
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
```

## Router

`import { router } from 'kuririn-react-router'`

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
router.switchTab('/wode')
```

## Remark

This package depends on React, mobx, and mobx-react, so please ensure that these packages are already installed in your project
