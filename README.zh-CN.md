# Welcome to kuririn-react-router

## 介绍

模拟 app 中页面栈的效果，实现页面的前进、后退、跳转，支持浏览器的前进、后退按钮

演示：
detail1 是 二级页面，detail2 是 三级页面

[演示 gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0ef290dad56a4ee290fd6309b6d85cc1~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2028&h=1608&s=11646572&e=gif&f=1640&b=24241e)

## KRoutes

### Props

| 属性        | 说明              | 类型                  | 默认值    |
| ----------- | ----------------- | --------------------- | --------- |
| historyType | 路由方式          | `'hash' \| 'browser'` | 'browser' |
| pages       | 全部的页面        | `IPageItem[]`         | -         |
| page404     | 可以传入 404 页面 | `React.ReactNode`     | -         |

```ts
export interface IPageItem {
  path: string
  component: React.FC
}

export interface IKRoutesProps {
  historyType?: IHistoryType
  pages: IPageItem[]
  page404?: React.FC
}
```

## Router

支持 router.push router.back

## Example

`App.tsx`

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

export default App
```

路由跳转

```tsx
import { router } from 'kuririn-react-router'

...
router.push('/detail1')
```

## 注

这个包依赖 react、mobx、mobx-react，所以请确保你的项目中已经安装了这些包。
