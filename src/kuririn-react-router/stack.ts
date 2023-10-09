import cloneDeep from 'lodash/cloneDeep'
import { autorun, makeAutoObservable, runInAction } from 'mobx'

export interface IPage {
  stamp: number
  pathname: string
  search: string
  url: string
  isTab?: boolean
  isTabActive?: boolean
}

class Stack {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  pages: IPage[] = []

  /// actions
  pushPage(p: IPage) {
    this.pages.push(p)
  }
  // 剔除回到的页面 之后的页面
  backPage(n: number) {
    this.pages = this.pages.slice(0, this.pages.length + n)
  }
  // 跳转tab
  switchPage(p: IPage) {
    const _pages = this.pages.filter((page) => page.isTab)
    const toPathname = p.pathname
    if (!this.pages.some((page) => page.pathname === toPathname)) {
      // 还没打开这个tab
      this.pages = _pages
        .map((page) => {
          return {
            ...page,
            isTabActive: false,
          }
        })
        // @ts-ignore
        .concat(p)
    } else {
      // 已经打开这个tab
      this.pages = _pages.map((page) => {
        return {
          ...page,
          isTabActive: page.pathname === toPathname,
        }
      })
    }
  }
}

const stack = new Stack()

export default stack
