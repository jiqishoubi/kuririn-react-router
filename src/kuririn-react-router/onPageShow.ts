import { useEffect } from 'react'
import cloneDeep from 'lodash/cloneDeep'

export default function onPageShow(props: any, callback: Function) {
  const { isKBlock } = props as { isKBlock: boolean }

  useEffect(() => {
    if (isKBlock) {
      callback?.()
    }
  }, [isKBlock])
}
