import { useContext } from 'react'
import { KContext } from '../store'

export type IHistoryType = 'browser' | 'hash'

export default function useHistory() {
  const {
    state: { history },
  } = useContext(KContext)
  return history
}
