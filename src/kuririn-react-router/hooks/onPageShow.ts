import { useEffect } from 'react'

export default function onPageShow(props: any, callback: Function) {
  useEffect(() => {
    if (props.hasOwnProperty('isKBlock') && props.isKBlock === true) {
      callback?.()
    }
  }, [props.isKBlock])
}
