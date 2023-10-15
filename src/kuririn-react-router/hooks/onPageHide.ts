import { useEffect } from 'react'

export default function onPageHide(props: any, callback: Function) {
  useEffect(() => {
    if (props.hasOwnProperty('isKBlock') && props.isKBlock === false) {
      callback?.()
    }
  }, [props.isKBlock])
}
