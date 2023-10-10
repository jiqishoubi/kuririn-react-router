import cloneDeep from 'lodash/cloneDeep'
import { autorun, makeAutoObservable, runInAction } from 'mobx'

/**
 *
 * 操作 pages data
 * Operate pages data
 */

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
  // remove Pages after returned pages
  backPage(n: number) {
    this.pages = this.pages.slice(0, this.pages.length + n)
  }
  // 跳转tab
  // Jump tab
  switchPage(p: IPage) {
    const _pages = this.pages.filter((page) => page.isTab)
    const toPathname = p.pathname
    if (!this.pages.some((page) => page.pathname === toPathname)) {
      // 还没打开这个tab
      // I haven't opened this tab yet
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
      // This tab has already been opened
      this.pages = _pages.map((page) => {
        return {
          ...page,
          isTabActive: page.pathname === toPathname,
        }
      })
    }
  }
  // replace page
  replacePage(curPathname: string, p: IPage) {
    const index = this.pages.findIndex((page) => page.pathname === curPathname)
    if (index > -1) {
      this.pages[index] = p
    }
  }
}

const stack = new Stack()

export default stack
