import { useEffect } from 'react'
import router, { history } from '.'

export default function useRouter() {
  useEffect(() => {
    const pathname = history.location.pathname
    router.push(pathname)
    // window.addEventListener(
    //   'popstate',
    //   function (evt) {
    //     console.log('🚀 ~ evt:', evt)
    //   },
    //   false
    // )
  }, [])
}
