import { useRouter } from '@/kuririn-react-router'
import React from 'react'
import styles from './index.module.less'
import classNames from 'classnames'

const tabList = [
  {
    path: '/',
    title: 'index',
  },
  {
    path: '/user',
    title: 'user',
  },
]

const Index: React.FC = () => {
  const router = useRouter()

  return (
    <div className={styles.tab_wrap}>
      {tabList.map((item) => {
        const isActive = window.location.pathname === item.path
        return (
          <div
            key={item.path}
            className={classNames(styles.tab_item, isActive && styles.active)}
            onClick={() => {
              router.switchTab(item.path)
            }}
          >
            {item.title}
          </div>
        )
      })}
    </div>
  )
}
export default Index
