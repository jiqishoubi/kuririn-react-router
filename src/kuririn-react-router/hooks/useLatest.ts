import { useRef } from 'react'

/**
 *
 * @description 用于获取最新的值，function也可以
 */
function useLatest<T>(value: T) {
  const ref = useRef(value)
  ref.current = value
  return ref
}

export default useLatest
