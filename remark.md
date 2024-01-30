# 登录官方源

npm login --registry=https://registry.npmjs.org/

# 发布后 再测试一下

发布后，可以把 example 文件夹中的 `from '@/kuririn-react-router'` 替换成 `from 'kuririn-react-router'`

然后再跑一遍测一下

注意：可能需要更新 devDependencies 中 kuririn-react-router 的版本号
