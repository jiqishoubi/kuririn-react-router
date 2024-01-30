/**
 * 
 * 
  IPageItem KRotues传进来的pages数组的每一项
  IPage stack页面栈中的数据object
 * 
 */
///

export { default as KRouter } from './KRouter'
export * from './KRouter'
export { default as useRouter } from './hooks/useRouter'
export { default as useHistory } from './hooks/useHistory'
export { default as onPageShow } from './hooks/onPageShow'
export { default as onPageHide } from './hooks/onPageHide'

export { browserHistory as UNSAFE_browserHistory, hashHistory as UNSAFE_hashHistory } from './store'
