import { useEffect } from 'react'
import cloneDeep from 'lodash/cloneDeep'

export default function onPageHide(props: any, callback: Function) {
  const { isKBlock } = props as { isKBlock: boolean }

  useEffect(() => {
    if (!isKBlock) {
      callback?.()
    }
  }, [isKBlock])
}
