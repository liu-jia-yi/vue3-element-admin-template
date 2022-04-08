import { ElMessage } from 'element-plus'
import axios from 'axios'
import { useUserStore } from '@/stores/user'

const service = axios.create({
  // baseURL: '/api'
})

/**
 * 每次请求在 header 中带上 token
 */
service.interceptors.request.use((config: any) => {
  const userStore = useUserStore()
  if (userStore.token) {
    config.headers.token = userStore.token
  }
  return config
})

/**
 * 拦截每一次响应，判断是否 token 失效
 * 如果 token 失效就退出登录并提示信息
 */
service.interceptors.response.use(response => {
  const res = response.data
  const userStore = useUserStore()

  // token 无效
  if (res.code === 401) {
    ElMessage({
      message: res.message || '页面长时间未使用，请重新登录',
      type: 'warning',
      duration: 5000
    })
    userStore.logout()
    return Promise.reject(new Error(res.message || 'Error'))
  } else if (res.code !== 200) {
    ElMessage({
      message: res.message || 'Error',
      type: 'error',
      duration: 5000
    })
    return Promise.reject(new Error(res.message || 'Error'))
  } else {
    return res
  }
})

export default service