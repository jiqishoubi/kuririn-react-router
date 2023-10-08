import { autorun, makeAutoObservable, runInAction } from 'mobx'

export interface IPage {
  id: string
  stamp: number
  title: string
  pathname: string
  search: string
  href: string
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
}

const stack = new Stack()

export default stack
