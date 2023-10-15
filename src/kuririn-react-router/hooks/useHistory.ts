import { useContext } from 'react'
import { KContent } from '../store'

export type IHistoryType = 'browser' | 'hash'

export default function useHistory() {
  const {
    state: { history },
  } = useContext(KContent)
  return history
}
