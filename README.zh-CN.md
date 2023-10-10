<p align="center" style="color: #343a40">
  <img src="https://raw.githubusercontent.com/jiqishoubi/kuririn-react-router/master/static/kuririn-logo.jpg" alt="kuririn-react-router logo" width="130">
  <h1 align="center">Welcome to kuririn-react-router</h1>
</p>

kuririn-react-router 是一个用于 H5 的路由库，它可以模拟 App（或小程序） 中页面栈的效果，实现页面的前进、后退、跳转，支持浏览器的前进、后退按钮

## 演示

例子中，index 是一级页面,detail1 是 二级页面，detail2 是 三级页面

[演示 gif](https://github.com/jiqishoubi/kuririn-react-router/blob/master/static/demo.gif)

## KRoutes

### Props

| 属性        | 说明              | 类型                  | 默认值    |
| ----------- | ----------------- | --------------------- | --------- |
| historyType | 路由方式          | `'hash' \| 'browser'` | 'browser' |
| pages       | 全部的页面        | `IPageItem[]`         | -         |
| page404     | 可以传入 404 页面 |                       | -         |

```ts
export interface IPageItem {
  path: string
  component: IPageItemComponent
  isTab?: boolean
}
```

入口文件`App.tsx`

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

## 注

这个包依赖 react、mobx、mobx-react，所以请确保你的项目中已经安装了这些包。
