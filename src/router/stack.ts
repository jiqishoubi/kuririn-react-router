import { autorun, makeAutoObservable, runInAction } from 'mobx'

export interface IPage {
  stamp: number
  pathname: string
  search: string
  url: string
}

class Stack {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  pages: IPage[] = []

  // actions
  pushPage(p: IPage) {
    this.pages.push(p)
  }
  backPage(n: number) {
    this.pages = this.pages.slice(0, this.pages.length - n)
  }
}

const stack = new Stack()

export default stack
