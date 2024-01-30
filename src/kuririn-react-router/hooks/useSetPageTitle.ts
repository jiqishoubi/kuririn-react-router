import { useEffect } from 'react'
import { IPage } from '../store'

export default function useSetPageTitle(page: IPage, isKBlock: boolean) {
  useEffect(() => {
    if (isKBlock) {
      if (page?.title) {
        document.title = page.title // todo when hide title
      }
    }
  }, [isKBlock])
}
