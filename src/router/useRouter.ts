import { useEffect } from 'react'
import router, { history } from '.'

function listen(evt: PopStateEvent) {
  console.log('🚀 ~ evt:', evt)
}

export default function useRouter() {
  useEffect(() => {
    const pathname = history.location.pathname
    router.push(pathname)

    window.addEventListener('popstate', listen, false)

    return () => {
      window.removeEventListener('popstate', listen)
    }
  }, [])
}
