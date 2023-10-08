import { autorun, makeAutoObservable, runInAction } from 'mobx'

class Stack {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  pages: any[] = []

  // actions
  pushPage(u: string) {
    this.pages.push(u)
  }
}

const stack = new Stack()

export default stack
