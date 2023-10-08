import React, { useEffect, useState } from 'react'
import PageGetter from '../PageGetter'
import styles from './index.module.less'
import { observer } from 'mobx-react'
import stack from '../stack'
import useRouter from '../useRouter'

const pageModules = import.meta.globEager('@/pages/**/**/index.tsx')

const PageRouter: React.FC = () => {
  useRouter()

  const pages = stack.pages

  return (
    <>
      {pages.map((page, index) => {
        const key = `_${index}_${page}`
        return (
          <div
            key={key}
            id={key}
            className={styles._page}
            style={{
              display: index === pages.length - 1 ? 'block' : 'none',
            }}
          >
            <PageGetter pageModules={pageModules} page={page} />
          </div>
        )
      })}
    </>
  )
}
export default observer(PageRouter)
