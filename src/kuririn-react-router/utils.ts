import { IPageItem } from './KRouter'

export function getIsTab(
  allPageItems: IPageItem[],
  options: {
    pathname?: string
    url?: string
  }
) {
  const { pathname, url } = options
  const p = pathname || url?.split('?')[0]
  return (allPageItems || []).some((page) => page.path === p && page.isTab)
}
