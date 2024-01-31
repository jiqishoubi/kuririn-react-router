import { useContext } from 'react'
import { KContext } from '../store'

export default function useCurrentPages() {
  const {
    state: { pages },
  } = useContext(KContext)
  return pages
}
